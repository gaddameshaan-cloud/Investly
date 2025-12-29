import express from 'express';
import db from '../database/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/dashboard', authenticateToken, (req, res) => {
  const userId = req.user.id;
  
  const queries = {
    totalLessons: new Promise((resolve, reject) => {
      db.get('SELECT COUNT(*) as count FROM lessons', (err, row) => {
        if (err) reject(err);
        else resolve(row.count);
      });
    }),
    completedLessons: new Promise((resolve, reject) => {
      db.get(
        'SELECT COUNT(*) as count FROM user_progress WHERE user_id = ? AND completed = 1',
        [userId],
        (err, row) => {
          if (err) reject(err);
          else resolve(row.count);
        }
      );
    }),
    averageScore: new Promise((resolve, reject) => {
      db.get(
        'SELECT AVG(score) as avg FROM quiz_attempts WHERE user_id = ?',
        [userId],
        (err, row) => {
          if (err) reject(err);
          else resolve(row.avg || 0);
        }
      );
    }),
    totalTimeSpent: new Promise((resolve, reject) => {
      db.get(
        'SELECT SUM(time_spent) as total FROM user_progress WHERE user_id = ?',
        [userId],
        (err, row) => {
          if (err) reject(err);
          else resolve(row.total || 0);
        }
      );
    }),
    recentActivity: new Promise((resolve, reject) => {
      db.all(
        `SELECT l.title, up.score, up.completed_at, l.level 
         FROM user_progress up 
         JOIN lessons l ON up.lesson_id = l.id 
         WHERE up.user_id = ? 
         ORDER BY up.completed_at DESC LIMIT 10`,
        [userId],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    }),
    levelProgress: new Promise((resolve, reject) => {
      db.all(
        `SELECT l.level, COUNT(*) as completed 
         FROM user_progress up 
         JOIN lessons l ON up.lesson_id = l.id 
         WHERE up.user_id = ? AND up.completed = 1 
         GROUP BY l.level`,
        [userId],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    })
  };

  Promise.all(Object.values(queries))
    .then(([totalLessons, completedLessons, averageScore, totalTimeSpent, recentActivity, levelProgress]) => {
      res.json({
        totalLessons,
        completedLessons,
        averageScore: Math.round(averageScore),
        totalTimeSpent,
        completionRate: Math.round((completedLessons / totalLessons) * 100),
        recentActivity,
        levelProgress
      });
    })
    .catch(err => {
      res.status(500).json({ error: 'Database error' });
    });
});

export default router;
