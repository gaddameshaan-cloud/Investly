import express from 'express';
import jwt from 'jsonwebtoken';
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

export default router;