import db from './db.js';

const runConversationsMigrations = () => {
  console.log('Running conversations migrations...');

  // Create conversations table
  db.run(`
    CREATE TABLE IF NOT EXISTS conversations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `, (err) => {
    if (err) console.error('Error creating conversations table:', err);
    else console.log('✅ Conversations table ready');
  });

  // Create conversation_messages table
  db.run(`
    CREATE TABLE IF NOT EXISTS conversation_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      conversation_id INTEGER NOT NULL,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
    )
  `, (err) => {
    if (err) console.error('Error creating conversation_messages table:', err);
    else console.log('✅ Conversation messages table ready');
  });

  console.log('Conversations migrations completed');
};

export default runConversationsMigrations;
