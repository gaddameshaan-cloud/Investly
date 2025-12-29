import db from './db.js';

// Add email verification and password reset fields to users table
const authMigrations = [
  `ALTER TABLE users ADD COLUMN email_verified BOOLEAN DEFAULT 0`,
  `ALTER TABLE users ADD COLUMN verification_token TEXT`,
  `ALTER TABLE users ADD COLUMN verification_token_expires DATETIME`,
  `ALTER TABLE users ADD COLUMN reset_token TEXT`,
  `ALTER TABLE users ADD COLUMN reset_token_expires DATETIME`
];

export const runAuthMigrations = () => {
  db.serialize(() => {
    authMigrations.forEach(migration => {
      db.run(migration, (err) => {
        if (err && !err.message.includes('duplicate column')) {
          console.error('Auth migration error:', err);
        }
      });
    });
    console.log('Auth migrations completed');
  });
};

export default runAuthMigrations;
