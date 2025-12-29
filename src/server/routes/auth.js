import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import db from '../database/db.js';
import { sendVerificationEmail, sendPasswordResetEmail } from '../utils/email.js';

const router = express.Router();

// Generate random token
const generateToken = () => crypto.randomBytes(32).toString('hex');

// REGISTER - Create new user with email verification
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  // Validation
  if (!email || !password || !name) {
    return res.status(400).json({ 
      success: false,
      error: 'All fields are required' 
    });
  }

  if (password.length < 6) {
    return res.status(400).json({ 
      success: false,
      error: 'Password must be at least 6 characters' 
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = generateToken();
    const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    db.run(
      `INSERT INTO users (email, password, name, verification_token, verification_token_expires) 
       VALUES (?, ?, ?, ?, ?)`,
      [email, hashedPassword, name, verificationToken, tokenExpires.toISOString()],
      async function(err) {
        if (err) {
          return res.status(400).json({ 
            success: false,
            error: 'Email already exists' 
          });
        }
        
        // Send verification email
        await sendVerificationEmail(email, verificationToken);
        
        const token = jwt.sign({ id: this.lastID, email }, process.env.JWT_SECRET);
        res.json({ 
          success: true,
          message: 'Registration successful! Please check your email to verify your account.',
          token, 
          user: { 
            id: this.lastID, 
            email, 
            name,
            emailVerified: false
          } 
        });
      }
    );
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Server error during registration' 
    });
  }
});

// LOGIN - Authenticate user
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      success: false,
      error: 'Email and password are required' 
    });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err || !user) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid email or password' 
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid email or password' 
      });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
    res.json({ 
      success: true,
      message: 'Login successful',
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        name: user.name,
        emailVerified: user.email_verified === 1
      } 
    });
  });
});

// VERIFY EMAIL - Confirm email address
router.post('/verify-email', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ 
      success: false,
      error: 'Verification token is required' 
    });
  }

  db.get(
    `SELECT * FROM users WHERE verification_token = ? AND verification_token_expires > datetime('now')`,
    [token],
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({ 
          success: false,
          error: 'Invalid or expired verification token' 
        });
      }

      db.run(
        `UPDATE users SET email_verified = 1, verification_token = NULL, verification_token_expires = NULL 
         WHERE id = ?`,
        [user.id],
        (err) => {
          if (err) {
            return res.status(500).json({ 
              success: false,
              error: 'Error verifying email' 
            });
          }

          res.json({ 
            success: true,
            message: 'Email verified successfully!',
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
              emailVerified: true
            }
          });
        }
      );
    }
  );
});

// RESEND VERIFICATION - Send new verification email
router.post('/resend-verification', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ 
      success: false,
      error: 'Email is required' 
    });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err || !user) {
      return res.status(400).json({ 
        success: false,
        error: 'User not found' 
      });
    }

    if (user.email_verified === 1) {
      return res.status(400).json({ 
        success: false,
        error: 'Email is already verified' 
      });
    }

    const verificationToken = generateToken();
    const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    db.run(
      `UPDATE users SET verification_token = ?, verification_token_expires = ? WHERE id = ?`,
      [verificationToken, tokenExpires.toISOString(), user.id],
      async (err) => {
        if (err) {
          return res.status(500).json({ 
            success: false,
            error: 'Error sending verification email' 
          });
        }

        await sendVerificationEmail(email, verificationToken);
        res.json({ 
          success: true,
          message: 'Verification email sent! Please check your inbox.' 
        });
      }
    );
  });
});

// FORGOT PASSWORD - Request password reset
router.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ 
      success: false,
      error: 'Email is required' 
    });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err || !user) {
      // Don't reveal if email exists for security
      return res.json({ 
        success: true,
        message: 'If that email exists, a password reset link has been sent.' 
      });
    }

    const resetToken = generateToken();
    const tokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    db.run(
      `UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?`,
      [resetToken, tokenExpires.toISOString(), user.id],
      async (err) => {
        if (err) {
          return res.status(500).json({ 
            success: false,
            error: 'Error processing password reset' 
          });
        }

        await sendPasswordResetEmail(email, resetToken);
        res.json({ 
          success: true,
          message: 'If that email exists, a password reset link has been sent.' 
        });
      }
    );
  });
});

// RESET PASSWORD - Set new password with token
router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ 
      success: false,
      error: 'Token and new password are required' 
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({ 
      success: false,
      error: 'Password must be at least 6 characters' 
    });
  }

  db.get(
    `SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > datetime('now')`,
    [token],
    async (err, user) => {
      if (err || !user) {
        return res.status(400).json({ 
          success: false,
          error: 'Invalid or expired reset token' 
        });
      }

      try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        db.run(
          `UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?`,
          [hashedPassword, user.id],
          (err) => {
            if (err) {
              return res.status(500).json({ 
                success: false,
                error: 'Error resetting password' 
              });
            }

            res.json({ 
              success: true,
              message: 'Password reset successfully! You can now log in with your new password.' 
            });
          }
        );
      } catch (error) {
        res.status(500).json({ 
          success: false,
          error: 'Server error during password reset' 
        });
      }
    }
  );
});

// GET USER INFO - Get current user details
router.get('/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false,
      error: 'No token provided' 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    db.get('SELECT id, email, name, email_verified FROM users WHERE id = ?', [decoded.id], (err, user) => {
      if (err || !user) {
        return res.status(404).json({ 
          success: false,
          error: 'User not found' 
        });
      }

      res.json({ 
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          emailVerified: user.email_verified === 1
        }
      });
    });
  } catch (error) {
    res.status(401).json({ 
      success: false,
      error: 'Invalid token' 
    });
  }
});

export default router;
