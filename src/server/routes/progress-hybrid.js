import express from 'express'
import db from '../database/db.js'
import { authenticateToken } from '../middleware/auth.js'

// Try to import Supabase client, fallback to SQLite if not available
let supabaseClient = null
try {
  const { supabaseClient: client } = await import('../database/supabase-hybrid.js')
  supabaseClient = client
  console.log('✅ Supabase client loaded for progress')
} catch (error) {
  console.log('ℹ️  Using SQLite for progress (Supabase not configured)')
}

const router = express.Router()

// Get user progress
router.get('/', authenticateToken, async (req, res) => {
  try {
    if (supabaseClient) {
      // Use Supabase - need to get internal user ID first
      // For now, use the JWT user ID directly (you may need to map this)
      const progress = await supabaseClient.getUserProgress(req.user.id)
      res.json(progress)
    } else {
      // Use SQLite (existing code)
      db.all(
        'SELECT * FROM user_progress WHERE user_id = ?',
        [req.user.id],
        (err, progress) => {
          if (err) {
            return res.status(500).json({ error: 'Database error' })
          }
          res.json(progress)
        }
      )
    }
  } catch (error) {
    console.error('Error fetching progress:', error)
    res.status(500).json({ error: 'Failed to fetch progress' })
  }
})

// Update lesson progress
router.post('/lesson/:lessonId', authenticateToken, async (req, res) => {
  const { lessonId } = req.params
  const { completed, score, timeSpent } = req.body
  
  try {
    if (supabaseClient) {
      // Use Supabase
      const progressData = {
        completed: completed || false,
        score: score || null,
        time_spent: timeSpent || null,
        completed_at: completed ? new Date().toISOString() : null
      }
      
      const progress = await supabaseClient.updateProgress(
        req.user.id, 
        parseInt(lessonId), 
        progressData
      )
      res.json(progress[0] || progress)
    } else {
      // Use SQLite (existing code)
      const checkQuery = 'SELECT * FROM user_progress WHERE user_id = ? AND lesson_id = ?'
      
      db.get(checkQuery, [req.user.id, lessonId], (err, existing) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' })
        }
        
        if (existing) {
          // Update existing progress
          db.run(
            'UPDATE user_progress SET completed = ?, score = ?, time_spent = ?, completed_at = ? WHERE user_id = ? AND lesson_id = ?',
            [completed || false, score, timeSpent, completed ? new Date().toISOString() : null, req.user.id, lessonId],
            function(err) {
              if (err) {
                return res.status(500).json({ error: 'Database error' })
              }
              res.json({ message: 'Progress updated' })
            }
          )
        } else {
          // Insert new progress
          db.run(
            'INSERT INTO user_progress (user_id, lesson_id, completed, score, time_spent, completed_at) VALUES (?, ?, ?, ?, ?, ?)',
            [req.user.id, lessonId, completed || false, score, timeSpent, completed ? new Date().toISOString() : null],
            function(err) {
              if (err) {
                return res.status(500).json({ error: 'Database error' })
              }
              res.json({ message: 'Progress created', id: this.lastID })
            }
          )
        }
      })
    }
  } catch (error) {
    console.error('Error updating progress:', error)
    res.status(500).json({ error: 'Failed to update progress' })
  }
})

// Get progress for specific lesson
router.get('/lesson/:lessonId', authenticateToken, async (req, res) => {
  const { lessonId } = req.params
  
  try {
    if (supabaseClient) {
      // Use Supabase
      const progress = await supabaseClient.getUserProgress(req.user.id)
      const lessonProgress = progress.find(p => p.lesson_id == lessonId)
      res.json(lessonProgress || null)
    } else {
      // Use SQLite (existing code)
      db.get(
        'SELECT * FROM user_progress WHERE user_id = ? AND lesson_id = ?',
        [req.user.id, lessonId],
        (err, progress) => {
          if (err) {
            return res.status(500).json({ error: 'Database error' })
          }
          res.json(progress || null)
        }
      )
    }
  } catch (error) {
    console.error('Error fetching lesson progress:', error)
    res.status(500).json({ error: 'Failed to fetch lesson progress' })
  }
})

export default router