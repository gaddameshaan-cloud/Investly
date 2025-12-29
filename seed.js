import sqlite3 from 'sqlite3';
import { curriculumData } from './src/server/data/simple-curriculum.js';

const db = new sqlite3.Database('./investly.db');

console.log('Seeding database with all 90 lessons...');

db.serialize(() => {
  db.run('DELETE FROM lessons');
  db.run('DELETE FROM quizzes');
  
  curriculumData.forEach((lesson, index) => {
    const lessonId = index + 1;
    
    db.run(
      'INSERT INTO lessons (title, level, module_number, lesson_number, content, examples, practice_problems, estimated_time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [lesson.title, lesson.level, lesson.module_number, lesson.lesson_number, lesson.content, lesson.examples, lesson.practice_problems, lesson.estimated_time]
    );
    
    if (lesson.quiz) {
      db.run(
        'INSERT INTO quizzes (lesson_id, questions, passing_score) VALUES (?, ?, ?)',
        [lessonId, JSON.stringify(lesson.quiz), 70]
      );
    }
  });
});

setTimeout(() => {
  console.log(`Seeding completed! Added ${curriculumData.length} lessons.`);
  db.close();
}, 1000);