import db from './db.js';
import { curriculumData } from '../data/simple-curriculum.js';

export default function autoSeedCurriculum() {
  return new Promise((resolve, reject) => {
    // Check if lessons already exist
    db.get('SELECT COUNT(*) as count FROM lessons', (err, row) => {
      if (err) {
        console.error('Error checking lessons:', err);
        reject(err);
        return;
      }
      
      if (row.count > 0) {
        console.log(`✅ Database already has ${row.count} lessons, skipping auto-seed`);
        resolve();
        return;
      }
      
      console.log('🌱 Auto-seeding curriculum with 90 lessons...');
      
      db.serialize(() => {
        // Clear any existing data
        db.run('DELETE FROM lessons');
        db.run('DELETE FROM quizzes');
        
        let completed = 0;
        
        // Insert all lessons
        curriculumData.forEach((lesson, index) => {
          const lessonId = index + 1;
          
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
                console.error(`❌ Error inserting lesson "${lesson.title}":`, err);
              } else {
                completed++;
                if (completed === curriculumData.length) {
                  console.log(`✅ Auto-seeded ${curriculumData.length} lessons successfully!`);
                  resolve();
                }
              }
            }
          );
          
          if (lesson.quiz) {
            db.run(
              'INSERT INTO quizzes (lesson_id, questions, passing_score) VALUES (?, ?, ?)',
              [lessonId, JSON.stringify(lesson.quiz), 70]
            );
          }
        });
      });
    });
  });
}