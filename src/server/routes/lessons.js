import express from 'express';
import db from '../database/db.js';
import { authenticateToken } from '../middleware/auth.js';
import { curriculumData } from '../data/simple-curriculum.js';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  const { level } = req.query;
  
  let query = 'SELECT * FROM lessons';
  const params = [];
  
  if (level) {
    query += ' WHERE level = ?';
    params.push(level);
  }
  
  query += ' ORDER BY module_number, lesson_number';
  
  db.all(query, params, (err, lessons) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(lessons);
  });
});

// Get lessons by module
router.get('/module/:moduleNumber', authenticateToken, (req, res) => {
  const { moduleNumber } = req.params;
  
  db.all(
    'SELECT * FROM lessons WHERE module_number = ? ORDER BY lesson_number',
    [moduleNumber],
    (err, lessons) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(lessons);
    }
  );
});

router.get('/:id', authenticateToken, (req, res) => {
  db.get('SELECT * FROM lessons WHERE id = ?', [req.params.id], (err, lesson) => {
    if (err || !lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    res.json(lesson);
  });
});

router.post('/seed', (req, res) => {
  db.serialize(() => {
    // Clear existing data
    db.run('DELETE FROM lessons');
    db.run('DELETE FROM quizzes');
    
    // Insert lessons and quizzes
    curriculumData.forEach((lesson, index) => {
      const lessonId = index + 1;
      
      db.run(
        'INSERT INTO lessons (title, level, module_number, lesson_number, content, examples, practice_problems, estimated_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          lesson.title,
          lesson.level,
          lesson.module_number,
          1, // Default lesson_number to 1 since these are module titles
          lesson.content,
          lesson.examples,
          lesson.practice_problems,
          lesson.estimated_time
        ]
      );
      
      if (lesson.quiz) {
        db.run(
          'INSERT INTO quizzes (lesson_id, questions, passing_score) VALUES (?, ?, ?)',
          [lessonId, JSON.stringify(lesson.quiz), 70]
        );
      }
    });
    
    res.json({ 
      message: 'Curriculum seeded successfully', 
      lessons: curriculumData.length 
    });
  });
});

export default router;
