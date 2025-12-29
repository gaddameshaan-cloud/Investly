import express from 'express'
import { supabaseAdmin } from '../database/supabase.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Get all lessons with optional level filter (optimized)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { level } = req.query
    console.log('Fetching lessons, level filter:', level)
    
    // Use single optimized query with minimal fields for dashboard
    let query = supabaseAdmin
      .from('lessons')
      .select('id, title, level, module_number, lesson_number, estimated_time')
      .order('module_number')
      .order('lesson_number')
    
    if (level && level !== 'all') {
      query = query.eq('level', level)
    }
    
    const { data: lessons, error } = await query
    
    if (error) {
      console.error('Supabase error:', error)
      return res.status(500).json({ error: 'Failed to fetch lessons', details: error.message })
    }
    
    console.log('Lessons fetched:', lessons?.length || 0)
    res.json(lessons || [])
    
  } catch (error) {
    console.error('Error fetching lessons:', error)
    res.status(500).json({ error: 'Internal server error', details: error.message })
  }
})

// Get lessons by module (optimized with progress data)
router.get('/module/:moduleNumber', authenticateToken, async (req, res) => {
  try {
    const { moduleNumber } = req.params
    const userId = req.user.id
    
    // Single query to get lessons with user progress
    const { data: lessons, error: lessonsError } = await supabaseAdmin
      .from('lessons')
      .select(`
        id, title, level, module_number, lesson_number, content, estimated_time,
        user_progress!left(completed, score, completed_at)
      `)
      .eq('module_number', moduleNumber)
      .eq('user_progress.user_id', userId)
      .order('lesson_number')
    
    if (lessonsError) {
      console.error('Supabase error:', lessonsError)
      return res.status(500).json({ error: 'Failed to fetch lessons' })
    }
    
    // Set cache headers
    res.set('Cache-Control', 'public, max-age=300')
    res.json(lessons || [])
    
  } catch (error) {
    console.error('Error fetching module lessons:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get single lesson with quiz and progress data (optimized)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id
    
    // Single query to get lesson with quiz and progress
    const { data: lesson, error } = await supabaseAdmin
      .from('lessons')
      .select(`
        *,
        quizzes(*),
        user_progress!left(completed, score, completed_at, time_spent)
      `)
      .eq('id', id)
      .eq('user_progress.user_id', userId)
      .single()
    
    if (error || !lesson) {
      return res.status(404).json({ error: 'Lesson not found' })
    }
    
    // Set cache headers
    res.set('Cache-Control', 'public, max-age=300')
    res.json(lesson)
    
  } catch (error) {
    console.error('Error fetching lesson:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Seed lessons (admin only - you might want to add admin middleware)
router.post('/seed', async (req, res) => {
  try {
    // Import curriculum data
    const { curriculumData } = await import('../data/simple-curriculum.js')
    
    // Clear existing lessons and quizzes
    await supabaseAdmin.from('lessons').delete().neq('id', 0)
    await supabaseAdmin.from('quizzes').delete().neq('id', 0)
    
    // Insert lessons
    const lessons = curriculumData.map((lesson, index) => ({
      title: lesson.title,
      level: lesson.level,
      module_number: lesson.module_number,
      lesson_number: lesson.lesson_number,
      content: lesson.content,
      examples: lesson.examples ? JSON.parse(lesson.examples) : null,
      practice_problems: lesson.practice_problems ? JSON.parse(lesson.practice_problems) : null,
      estimated_time: lesson.estimated_time
    }))
    
    const { data: insertedLessons, error: lessonsError } = await supabaseAdmin
      .from('lessons')
      .insert(lessons)
      .select()
    
    if (lessonsError) {
      return res.status(500).json({ error: 'Failed to seed lessons' })
    }
    
    // Insert quizzes
    const quizzes = []
    curriculumData.forEach((lesson, index) => {
      if (lesson.quiz) {
        quizzes.push({
          lesson_id: insertedLessons[index].id,
          questions: lesson.quiz,
          passing_score: 70
        })
      }
    })
    
    if (quizzes.length > 0) {
      const { error: quizzesError } = await supabaseAdmin
        .from('quizzes')
        .insert(quizzes)
      
      if (quizzesError) {
        console.error('Error seeding quizzes:', quizzesError)
      }
    }
    
    res.json({ 
      message: 'Curriculum seeded successfully',
      lessons: insertedLessons.length,
      quizzes: quizzes.length
    })
    
  } catch (error) {
    console.error('Error seeding curriculum:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router