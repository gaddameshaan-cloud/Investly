import express from 'express';
import db from '../database/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/lesson/:lessonId', authenticateToken, (req, res) => {
  db.get(
    'SELECT * FROM quizzes WHERE lesson_id = ?',
    [req.params.lessonId],
    (err, quiz) => {
      if (err || !quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
      res.json(quiz);
    }
  );
});

router.post('/submit', authenticateToken, (req, res) => {
  const { quiz_id, answers } = req.body;
  
  db.get('SELECT * FROM quizzes WHERE id = ?', [quiz_id], (err, quiz) => {
    if (err || !quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const questions = JSON.parse(quiz.questions);
    let correctCount = 0;
    
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct_answer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);
    
    db.run(
      'INSERT INTO quiz_attempts (user_id, quiz_id, score, answers) VALUES (?, ?, ?, ?)',
      [req.user.id, quiz_id, score, JSON.stringify(answers)],
      function(err) {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }
        
        res.json({
          score,
          correctCount,
          totalQuestions: questions.length,
          passed: score >= quiz.passing_score
        });
      }
    );
  });
});

router.get('/attempts', authenticateToken, (req, res) => {
  db.all(
    'SELECT * FROM quiz_attempts WHERE user_id = ? ORDER BY completed_at DESC',
    [req.user.id],
    (err, attempts) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(attempts);
    }
  );
});

export default router;
