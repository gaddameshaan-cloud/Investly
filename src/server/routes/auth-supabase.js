import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import { supabaseAdmin } from '../database/supabase.js'
import { sendPasswordResetEmail } from '../utils/email.js'

const router = express.Router()

// Generate random token
const generateToken = () => crypto.randomBytes(32).toString('hex')

// Register endpoint - stores in Supabase users table
router.post('/register', async (req, res) => {
  try {
    const { email, password, name, dateOfBirth, agreedToTerms } = req.body

    if (!email || !password || !name || !dateOfBirth) {
      return res.status(400).json({ error: 'Email, password, name, and date of birth are required' })
    }

    // Age validation
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < 13) {
      return res.status(400).json({ error: 'You must be at least 13 years old to create an account' })
    }

    // TODO: Uncomment after running database migration
    // if (!agreedToTerms) {
    //   return res.status(400).json({ error: 'You must agree to the Terms of Service and Privacy Policy' })
    // }

    // Check if user already exists (optimized query)
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .maybeSingle()

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user in Supabase users table
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        email,
        password: hashedPassword,
        name,
        date_of_birth: dateOfBirth,
        email_verified: true
        // TODO: Uncomment after running database migration
        // terms_accepted_at: new Date().toISOString(),
        // privacy_policy_accepted_at: new Date().toISOString()
      })
      .select()
      .single()

    if (userError) {
      console.error('Supabase user creation error:', userError)
      return res.status(500).json({ error: 'Failed to create user', details: userError.message })
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: userData.id, email: userData.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        date_of_birth: userData.date_of_birth
      },
      token
    })

  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    // Get user from Supabase (optimized query)
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, email, name, password, date_of_birth')
      .eq('email', email)
      .maybeSingle()

    if (userError || !userData) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, userData.password)
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: userData.id, email: userData.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      message: 'Login successful',
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        date_of_birth: userData.date_of_birth
      },
      token
    })

  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get current user endpoint
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' })
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    // Get user from Supabase
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, email, name, email_verified, date_of_birth')
      .eq('id', decoded.id)
      .single()

    if (userError || !userData) {
      return res.status(401).json({ error: 'User not found' })
    }

    res.json({ user: userData })

  } catch (error) {
    console.error('Get user error:', error)
    res.status(401).json({ error: 'Invalid token' })
  }
})

// Logout endpoint (client-side token removal)
router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' })
})

// FORGOT PASSWORD - Request password reset
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ 
        success: false,
        error: 'Email is required' 
      })
    }

    // Get user from Supabase
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, email')
      .eq('email', email)
      .maybeSingle()

    if (userError || !userData) {
      // Don't reveal if email exists for security
      return res.json({ 
        success: true,
        message: 'If that email exists, a password reset link has been sent.' 
      })
    }

    const resetToken = generateToken()
    const tokenExpires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    // Update user with reset token
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({
        reset_token: resetToken,
        reset_token_expires: tokenExpires.toISOString()
      })
      .eq('id', userData.id)

    if (updateError) {
      console.error('Reset token update error:', updateError)
      return res.status(500).json({ 
        success: false,
        error: 'Error processing password reset' 
      })
    }

    await sendPasswordResetEmail(email, resetToken)
    res.json({ 
      success: true,
      message: 'If that email exists, a password reset link has been sent.' 
    })

  } catch (error) {
    console.error('Forgot password error:', error)
    res.status(500).json({ 
      success: false,
      error: 'An error occurred' 
    })
  }
})

// RESET PASSWORD - Set new password with token
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body

    if (!token || !newPassword) {
      return res.status(400).json({ 
        success: false,
        error: 'Token and new password are required' 
      })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ 
        success: false,
        error: 'Password must be at least 6 characters' 
      })
    }

    // Find user with valid reset token
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, email, reset_token_expires')
      .eq('reset_token', token)
      .maybeSingle()

    if (userError || !userData) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid or expired reset token' 
      })
    }

    // Check if token is expired
    const now = new Date()
    const tokenExpires = new Date(userData.reset_token_expires)
    
    if (now > tokenExpires) {
      return res.status(400).json({ 
        success: false,
        error: 'Reset token has expired' 
      })
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // Update password and clear reset token
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({
        password: hashedPassword,
        reset_token: null,
        reset_token_expires: null
      })
      .eq('id', userData.id)

    if (updateError) {
      console.error('Password update error:', updateError)
      return res.status(500).json({ 
        success: false,
        error: 'Error updating password' 
      })
    }

    res.json({ 
      success: true,
      message: 'Password reset successfully' 
    })

  } catch (error) {
    console.error('Reset password error:', error)
    res.status(500).json({ 
      success: false,
      error: 'An error occurred' 
    })
  }
})

export default router