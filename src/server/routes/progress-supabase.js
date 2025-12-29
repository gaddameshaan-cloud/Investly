import express from 'express'
import { supabaseAdmin } from '../database/supabase.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Get user progress (super fast with aggressive caching)
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log('Fetching progress for user:', req.user.id)
    
    const { data: progress, error } = await supabaseAdmin
      .from('user_progress')
      .select('lesson_id, completed, score, completed_at')
      .eq('user_id', req.user.id)
    
    if (error) {
      console.error('Progress fetch error:', error)
      return res.status(500).json({ error: 'Failed to fetch progress', details: error.message })
    }
    
    console.log('Progress data:', progress?.length || 0, 'records')
    res.json(progress || [])
    
  } catch (error) {
    console.error('Error fetching progress:', error)
    res.status(500).json({ error: 'Internal server error', details: error.message })
  }
})

// Update lesson progress
router.post('/lesson/:lessonId', authenticateToken, async (req, res) => {
  try {
    const { lessonId } = req.params
    const { completed, score, timeSpent } = req.body
    
    const progressData = {
      user_id: req.user.id,
      lesson_id: parseInt(lessonId),
      completed: completed || false,
      score: score || null,
      time_spent: timeSpent || null,
      completed_at: completed ? new Date().toISOString() : null
    }
    
    // Use upsert to handle both insert and update
    const { data: progress, error } = await supabaseAdmin
      .from('user_progress')
      .upsert(progressData, {
        onConflict: 'user_id,lesson_id'
      })
      .select()
      .single()
    
    if (error) {
      return res.status(500).json({ error: 'Failed to update progress' })
    }
    
    res.json(progress)
    
  } catch (error) {
    console.error('Error updating progress:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get progress for specific lesson
router.get('/lesson/:lessonId', authenticateToken, async (req, res) => {
  try {
    const { lessonId } = req.params
    
    const { data: progress, error } = await supabaseAdmin
      .from('user_progress')
      .select('*')
      .eq('user_id', req.user.id)
      .eq('lesson_id', lessonId)
      .single()
    
    if (error && error.code !== 'PGRST116') { // PGRST116 is "not found"
      return res.status(500).json({ error: 'Failed to fetch lesson progress' })
    }
    
    res.json(progress || null)
    
  } catch (error) {
    console.error('Error fetching lesson progress:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router