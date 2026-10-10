import express from 'express'
import { supabaseAdmin } from '../database/supabase.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id

    // Fire all queries in parallel
    const [allLessonsResult, userProgressResult, quizAttemptsResult] = await Promise.all([
      supabaseAdmin.from('lessons').select('id, title, level, module_number, lesson_number'),
      supabaseAdmin
        .from('user_progress')
        .select('lesson_id, score, time_spent, completed_at')
        .eq('user_id', userId)
        .eq('completed', true),
      supabaseAdmin
        .from('quiz_attempts')
        .select('score, completed_at')
        .eq('user_id', userId)
    ])

    const allLessons = allLessonsResult.data || []
    const completedProgress = userProgressResult.data || []
    const quizAttempts = quizAttemptsResult.data || []

    // Build a Map from lesson id → lesson for quick lookups
    const lessonMap = new Map()
    for (const lesson of allLessons) {
      lessonMap.set(lesson.id, lesson)
    }

    // Basic counts
    const totalLessons = allLessons.length
    const completedLessons = completedProgress.length

    // totalTimeSpent
    const totalTimeSpent = completedProgress.reduce((sum, p) => sum + (p.time_spent || 0), 0)

    // completionRate
    const completionRate = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

    // averageScore — from quiz_attempts
    const averageScore = quizAttempts.length > 0
      ? Math.round(quizAttempts.reduce((sum, q) => sum + (q.score || 0), 0) / quizAttempts.length)
      : 0

    // quizzesTaken
    const quizzesTaken = quizAttempts.length

    // passRate — percentage of quiz attempts with score >= 70
    const passRate = quizAttempts.length > 0
      ? Math.round((quizAttempts.filter(q => (q.score || 0) >= 70).length / quizAttempts.length) * 100)
      : 0

    // levelProgress
    const levels = ['beginner', 'intermediate', 'advanced']
    const levelProgress = levels.map(level => {
      const total = allLessons.filter(l => l.level === level).length
      const completed = completedProgress.filter(p => {
        const lesson = lessonMap.get(p.lesson_id)
        return lesson && lesson.level === level
      }).length
      return { level, completed, total }
    })

    // recentActivity — sort by completed_at desc, take first 10, join with lesson data
    const recentActivity = [...completedProgress]
      .sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at))
      .slice(0, 10)
      .map(p => {
        const lesson = lessonMap.get(p.lesson_id) || {}
        return {
          title: lesson.title || 'Unknown Lesson',
          level: lesson.level || 'beginner',
          score: p.score || 0,
          completed_at: p.completed_at
        }
      })

    // moduleProgress — map of module_number → { title, total, completed }
    const moduleMap = new Map()
    for (const lesson of allLessons) {
      const mod = lesson.module_number
      if (!moduleMap.has(mod)) {
        moduleMap.set(mod, { module: mod, title: lesson.title || `Module ${mod}`, total: 0, completed: 0 })
      }
      moduleMap.get(mod).total += 1
    }
    for (const p of completedProgress) {
      const lesson = lessonMap.get(p.lesson_id)
      if (lesson && lesson.module_number != null) {
        const entry = moduleMap.get(lesson.module_number)
        if (entry) entry.completed += 1
      }
    }
    const moduleProgress = Array.from(moduleMap.values()).sort((a, b) => a.module - b.module)

    // streakDays — consecutive days ending today where at least one lesson was completed
    const completedDates = new Set(
      completedProgress
        .filter(p => p.completed_at)
        .map(p => {
          const d = new Date(p.completed_at)
          // Use local date YYYY-MM-DD
          const year = d.getFullYear()
          const month = String(d.getMonth() + 1).padStart(2, '0')
          const day = String(d.getDate()).padStart(2, '0')
          return `${year}-${month}-${day}`
        })
    )

    let streakDays = 0
    const today = new Date()
    for (let i = 0; i < 365; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      const dateStr = `${year}-${month}-${day}`
      if (completedDates.has(dateStr)) {
        streakDays += 1
      } else {
        break
      }
    }

    res.json({
      totalLessons,
      completedLessons,
      averageScore,
      totalTimeSpent,
      completionRate,
      levelProgress,
      recentActivity,
      moduleProgress,
      quizzesTaken,
      passRate,
      streakDays
    })

  } catch (error) {
    console.error('Analytics error:', error)
    res.status(500).json({ error: 'Failed to fetch analytics', details: error.message })
  }
})

export default router
