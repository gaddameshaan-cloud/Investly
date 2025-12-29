import express from 'express'
import { supabaseAdmin } from '../database/supabase.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Fast dashboard analytics - simplified for speed
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id
    
    // Super fast parallel queries - minimal data only
    const [lessonsCount, userProgress, quizScores] = await Promise.all([
      supabaseAdmin.from('lessons').select('id', { count: 'exact', head: true }),
      supabaseAdmin.from('user_progress').select('completed, score').eq('user_id', userId),
      supabaseAdmin.from('quiz_attempts').select('score').eq('user_id', userId)
    ])

    const totalLessons = lessonsCount.count || 0
    const progress = userProgress.data || []
    const scores = quizScores.data || []
    
    const completedLessons = progress.filter(p => p.completed).length
    const averageScore = scores.length > 0 
      ? Math.round(scores.reduce((sum, s) => sum + (s.score || 0), 0) / scores.length)
      : 0

    const analytics = {
      totalLessons,
      completedLessons,
      averageScore,
      totalTimeSpent: 0, // Skip for speed
      completionRate: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
      recentActivity: [], // Skip for speed
      levelProgress: [] // Skip for speed
    }

    // No caching for now to debug
    res.json(analytics)

  } catch (error) {
    console.error('Analytics error:', error)
    res.status(500).json({ error: 'Failed to fetch analytics', details: error.message })
  }
})

export default router