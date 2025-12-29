import express from 'express'
import db from '../database/db.js'
import { authenticateToken } from '../middleware/auth.js'

// Try to import Supabase client, fallback to SQLite if not available
let supabaseClient = null
let useSupabase = false

try {
  const { supabaseClient: client } = await import('../database/supabase-hybrid.js')
  supabaseClient = client
  useSupabase = client.available
  console.log(useSupabase ? '✅ Supabase client loaded for lessons' : 'ℹ️  Supabase not available, using SQLite for lessons')
} catch (error) {
  console.log('ℹ️  Using SQLite for lessons (Supabase not configured)')
  useSupabase = false
}

const router = express.Router()

// Get all lessons with optional level filter
router.get('/', authenticateToken, async (req, res) => {
  const { level } = req.query
  
  try {
    if (useSupabase && supabaseClient) {
      // Use Supabase
      console.log('📚 Fetching lessons from Supabase...')
      const lessons = await supabaseClient.getLessons(level)
      console.log(`✅ Got ${lessons.length} lessons from Supabase`)
      res.json(lessons)
    } else {
      // Use SQLite (existing code)
      console.log('📚 Fetching lessons from SQLite...')
      let query = 'SELECT * FROM lessons'
      const params = []
      
      if (level) {
        query += ' WHERE level = ?'
        params.push(level)
      }
      
      query += ' ORDER BY module_number, lesson_number'
      
      db.all(query, params, (err, lessons) => {
        if (err) {
          console.error('SQLite error:', err)
          return res.status(500).json({ error: 'Database error' })
        }
        console.log(`✅ Got ${lessons.length} lessons from SQLite`)
        res.json(lessons)
      })
    }
  } catch (error) {
    console.error('Error fetching lessons:', error)
    
    // Fallback to SQLite if Supabase fails
    if (useSupabase) {
      console.log('⚠️  Supabase failed, falling back to SQLite...')
      let query = 'SELECT * FROM lessons'
      const params = []
      
      if (level) {
        query += ' WHERE level = ?'
        params.push(level)
      }
      
      query += ' ORDER BY module_number, lesson_number'
      
      db.all(query, params, (err, lessons) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' })
        }
        res.json(lessons)
      })
    } else {
      res.status(500).json({ error: 'Failed to fetch lessons' })
    }
  }
})

// Get lessons by module
router.get('/module/:moduleNumber', authenticateToken, async (req, res) => {
  const { moduleNumber } = req.params
  
  try {
    if (useSupabase && supabaseClient) {
      // Use Supabase
      const lessons = await supabaseClient.getLessonsByModule(moduleNumber)
      res.json(lessons)
    } else {
      // Use SQLite (existing code)
      db.all(
        'SELECT * FROM lessons WHERE module_number = ? ORDER BY lesson_number',
        [moduleNumber],
        (err, lessons) => {
          if (err) {
            return res.status(500).json({ error: 'Database error' })
          }
          res.json(lessons)
        }
      )
    }
  } catch (error) {
    console.error('Error fetching module lessons:', error)
    
    // Fallback to SQLite
    if (useSupabase) {
      db.all(
        'SELECT * FROM lessons WHERE module_number = ? ORDER BY lesson_number',
        [moduleNumber],
        (err, lessons) => {
          if (err) {
            return res.status(500).json({ error: 'Database error' })
          }
          res.json(lessons)
        }
      )
    } else {
      res.status(500).json({ error: 'Failed to fetch module lessons' })
    }
  }
})

// Get single lesson
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params
  
  try {
    if (useSupabase && supabaseClient) {
      // Use Supabase
      const lesson = await supabaseClient.getLesson(id)
      if (!lesson) {
        return res.status(404).json({ error: 'Lesson not found' })
      }
      res.json(lesson)
    } else {
      // Use SQLite (existing code)
      db.get('SELECT * FROM lessons WHERE id = ?', [id], (err, lesson) => {
        if (err || !lesson) {
          return res.status(404).json({ error: 'Lesson not found' })
        }
        res.json(lesson)
      })
    }
  } catch (error) {
    console.error('Error fetching lesson:', error)
    
    // Fallback to SQLite
    if (useSupabase) {
      db.get('SELECT * FROM lessons WHERE id = ?', [id], (err, lesson) => {
        if (err || !lesson) {
          return res.status(404).json({ error: 'Lesson not found' })
        }
        res.json(lesson)
      })
    } else {
      res.status(500).json({ error: 'Failed to fetch lesson' })
    }
  }
})

// Seed endpoint (works with both)
router.post('/seed', async (req, res) => {
  try {
    if (useSupabase && supabaseClient) {
      // For Supabase, redirect to separate seeding script
      res.json({ 
        message: 'For Supabase seeding, run: node seed-full-curriculum.js',
        note: 'Supabase seeding requires separate script for security'
      })
    } else {
      // Use existing SQLite seeding logic
      const { curriculumData } = await import('../data/simple-curriculum.js')
      
      db.serialize(() => {
        db.run('DELETE FROM lessons')
        db.run('DELETE FROM quizzes')
        
        let completed = 0
        
        curriculumData.forEach((lesson, index) => {
          const lessonId = index + 1
          
          db.run(
            'INSERT INTO lessons (title, level, module_number, lesson_number, content, examples, practice_problems, estimated_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [
              lesson.title,
              lesson.level,
              lesson.module_number,
              lesson.lesson_number,
              lesson.content,
              lesson.examples,
              lesson.practice_problems,
              lesson.estimated_time
            ],
            function(err) {
              if (err) {
                console.error(`Error inserting lesson "${lesson.title}":`, err)
              } else {
                completed++
                if (completed === curriculumData.length) {
                  res.json({ 
                    message: 'Curriculum seeded successfully', 
                    lessons: curriculumData.length 
                  })
                }
              }
            }
          )
          
          if (lesson.quiz) {
            db.run(
              'INSERT INTO quizzes (lesson_id, questions, passing_score) VALUES (?, ?, ?)',
              [lessonId, JSON.stringify(lesson.quiz), 70]
            )
          }
        })
      })
    }
  } catch (error) {
    console.error('Error seeding:', error)
    res.status(500).json({ error: 'Seeding failed' })
  }
})

export default router