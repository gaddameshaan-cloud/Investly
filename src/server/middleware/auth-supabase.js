import { supabaseAdmin, getUserIdFromAuth } from '../database/supabase.js'

export const authenticateSupabaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header provided' })
    }
    
    const token = authHeader.split(' ')[1]
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }
    
    // Verify token with Supabase
    const { data: authData, error: authError } = await supabaseAdmin.auth.getUser(token)
    
    if (authError || !authData.user) {
      return res.status(401).json({ error: 'Invalid or expired token' })
    }
    
    // Get internal user ID
    const userId = await getUserIdFromAuth(authData.user.id)
    
    if (!userId) {
      return res.status(401).json({ error: 'User profile not found' })
    }
    
    // Add user info to request
    req.user = {
      id: userId,
      auth_user_id: authData.user.id,
      email: authData.user.email
    }
    
    next()
    
  } catch (error) {
    console.error('Auth middleware error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export default authenticateSupabaseToken