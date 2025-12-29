import express from 'express';
import db from '../database/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  db.all(
    'SELECT * FROM user_progress WHERE user_id = ? ORDER BY completed_at DESC',
    [req.user.id],
    (err, progress) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(progress);
    }
  );
});

router.post('/', authenticateToken, (req, res) => {
  const { lesson_id, completed, score, time_spent } = req.body;
  
  db.run(
    `INSERT INTO user_progress (user_id, lesson_id, completed, score, time_spent, completed_at) 
     VALUES (?, ?, ?, ?, ?, datetime('now'))`,
    [req.user.id, lesson_id, completed, score, time_spent],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ id: this.lastID, message: 'Progress saved' });
    }
  );
});

router.get('/achievements', authenticateToken, (req, res) => {
  db.all(
    'SELECT * FROM achievements WHERE user_id = ? ORDER BY earned_at DESC',
    [req.user.id],
    (err, achievements) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(achievements);
    }
  );
});

export default router;
