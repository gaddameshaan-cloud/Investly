import express from 'express'
import { supabaseAdmin } from '../database/supabase.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Get quiz for a lesson with user attempts (optimized)
router.get('/lesson/:lessonId', authenticateToken, async (req, res) => {
  try {
    const { lessonId } = req.params
    const userId = req.user.id
    
    // Single query to get quiz with user attempts
    const { data: quiz, error } = await supabaseAdmin
      .from('quizzes')
      .select(`
        *,
        quiz_attempts!left(score, completed_at, answers)
      `)
      .eq('lesson_id', lessonId)
      .eq('quiz_attempts.user_id', userId)
      .single()
    
    if (error && error.code !== 'PGRST116') {
      return res.status(500).json({ error: 'Failed to fetch quiz' })
    }
    
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' })
    }
    
    // Set cache headers
    res.set('Cache-Control', 'public, max-age=300')
    res.json(quiz)
    
  } catch (error) {
    console.error('Error fetching quiz:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Submit quiz attempt (optimized with progress update)
router.post('/attempt', authenticateToken, async (req, res) => {
  try {
    const { quizId, lessonId, answers, score, timeSpent } = req.body
    
    if (!quizId || !lessonId || !answers || score === undefined) {
      return res.status(400).json({ error: 'Quiz ID, lesson ID, answers, and score are required' })
    }
    
    const userId = req.user.id
    const now = new Date().toISOString()
    
    // Use transaction to update both quiz attempt and lesson progress
    const { data, error } = await supabaseAdmin.rpc('submit_quiz_and_progress', {
      p_user_id: userId,
      p_quiz_id: parseInt(quizId),
      p_lesson_id: parseInt(lessonId),
      p_score: parseInt(score),
      p_answers: answers,
      p_time_spent: timeSpent || 0,
      p_completed_at: now
    })
    
    if (error) {
      console.error('Transaction error:', error)
      // Fallback to individual operations
      const attemptData = {
        user_id: userId,
        quiz_id: parseInt(quizId),
        score: parseInt(score),
        answers: answers,
        completed_at: now
      }
      
      const { data: attempt, error: attemptError } = await supabaseAdmin
        .from('quiz_attempts')
        .insert(attemptData)
        .select()
        .single()
      
      if (attemptError) {
        return res.status(500).json({ error: 'Failed to save quiz attempt' })
      }
      
      // Update progress separately
      const progressData = {
        user_id: userId,
        lesson_id: parseInt(lessonId),
        completed: score >= 70, // Pass threshold
        score: parseInt(score),
        time_spent: timeSpent || 0,
        completed_at: score >= 70 ? now : null
      }
      
      await supabaseAdmin
        .from('user_progress')
        .upsert(progressData, { onConflict: 'user_id,lesson_id' })
      
      return res.json(attempt)
    }
    
    res.json({ success: true, data })
    
  } catch (error) {
    console.error('Error saving quiz attempt:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get user's quiz attempts
router.get('/attempts', authenticateToken, async (req, res) => {
  try {
    const { data: attempts, error } = await supabaseAdmin
      .from('quiz_attempts')
      .select(`
        *,
        quizzes (
          lesson_id,
          lessons (
            title,
            module_number
          )
        )
      `)
      .eq('user_id', req.user.id)
      .order('completed_at', { ascending: false })
    
    if (error) {
      return res.status(500).json({ error: 'Failed to fetch quiz attempts' })
    }
    
    res.json(attempts)
    
  } catch (error) {
    console.error('Error fetching quiz attempts:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get attempts for specific quiz
router.get('/attempts/quiz/:quizId', authenticateToken, async (req, res) => {
  try {
    const { quizId } = req.params
    
    const { data: attempts, error } = await supabaseAdmin
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', req.user.id)
      .eq('quiz_id', quizId)
      .order('completed_at', { ascending: false })
    
    if (error) {
      return res.status(500).json({ error: 'Failed to fetch quiz attempts' })
    }
    
    res.json(attempts)
    
  } catch (error) {
    console.error('Error fetching quiz attempts:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router