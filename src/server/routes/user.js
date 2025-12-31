import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '../database/supabase.js';

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Save onboarding questionnaire responses
router.post('/onboarding', authenticateToken, async (req, res) => {
  try {
    const { userId, responses } = req.body;
    
    console.log('Received onboarding request:', {
      userId,
      responses,
      tokenUserId: req.user.id
    });
    
    // Verify the user ID matches the token
    if (userId !== req.user.id) {
      console.error('User ID mismatch:', { userId, tokenUserId: req.user.id });
      return res.status(403).json({ error: 'Unauthorized' });
    }

    console.log('Saving to database:', {
      user_id: userId,
      how_did_you_find_us: responses.howDidYouFindUs,
      familiarity_with_finance: responses.familiarityWithFinance,
      current_goal: responses.currentGoal
    });

    // Save responses to database
    const { data, error } = await supabaseAdmin
      .from('user_onboarding')
      .insert({
        user_id: userId,
        how_did_you_find_us: responses.howDidYouFindUs,
        familiarity_with_finance: responses.familiarityWithFinance,
        current_goal: responses.currentGoal, // Now an array
        completed_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Database error saving onboarding:', error);
      return res.status(500).json({ error: 'Failed to save onboarding responses', details: error.message });
    }

    console.log('Successfully saved onboarding data:', data);

    res.json({
      message: 'Onboarding responses saved successfully',
      data
    });

  } catch (error) {
    console.error('Onboarding error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Get user onboarding status
router.get('/onboarding-status', authenticateToken, async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('user_onboarding')
      .select('completed_at')
      .eq('user_id', req.user.id)
      .maybeSingle();

    if (error) {
      console.error('Error checking onboarding status:', error);
      return res.status(500).json({ error: 'Failed to check onboarding status' });
    }

    res.json({
      hasCompletedOnboarding: !!data,
      completedAt: data?.completed_at || null
    });

  } catch (error) {
    console.error('Onboarding status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile (name only)
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || name.trim().length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters long' });
    }

    // Get current user data to track the change
    const { data: currentUser, error: getCurrentError } = await supabaseAdmin
      .from('users')
      .select('name')
      .eq('id', req.user.id)
      .single();

    if (getCurrentError) {
      console.error('Error getting current user:', getCurrentError);
      return res.status(500).json({ error: 'Failed to get current user data' });
    }

    // Update user in database
    const { data, error } = await supabaseAdmin
      .from('users')
      .update({ name: name.trim() })
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating profile:', error);
      return res.status(500).json({ error: 'Failed to update profile' });
    }

    // Track the username change
    if (currentUser.name !== name.trim()) {
      const { error: trackError } = await supabaseAdmin
        .from('username_changes')
        .insert({
          user_id: req.user.id,
          old_name: currentUser.name,
          new_name: name.trim()
        });

      if (trackError) {
        console.error('Error tracking username change:', trackError);
        // Don't fail the request if tracking fails
      }
    }

    console.log('Profile updated successfully:', data);

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: data.id,
        email: data.email,
        name: data.name
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user password
router.put('/password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters long' });
    }

    // Get current user data
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('password')
      .eq('id', req.user.id)
      .single();

    if (userError || !userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, userData.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update password in database
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ password: hashedNewPassword })
      .eq('id', req.user.id);

    if (updateError) {
      console.error('Error updating password:', updateError);
      return res.status(500).json({ error: 'Failed to update password' });
    }

    res.json({
      message: 'Password updated successfully'
    });

  } catch (error) {
    console.error('Password update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;