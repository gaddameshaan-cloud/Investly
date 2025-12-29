import express from 'express';
import db from '../database/db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all conversations for a user
router.get('/', authenticateToken, (req, res) => {
  db.all(
    `SELECT c.*, 
      (SELECT content FROM conversation_messages 
       WHERE conversation_id = c.id 
       ORDER BY created_at ASC LIMIT 1) as first_message,
      (SELECT COUNT(*) FROM conversation_messages 
       WHERE conversation_id = c.id) as message_count
     FROM conversations c 
     WHERE c.user_id = ? 
     ORDER BY c.updated_at DESC`,
    [req.user.id],
    (err, conversations) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to fetch conversations' });
      }
      res.json(conversations);
    }
  );
});

// Get a specific conversation with all messages
router.get('/:id', authenticateToken, (req, res) => {
  const conversationId = req.params.id;

  // First verify the conversation belongs to the user
  db.get(
    'SELECT * FROM conversations WHERE id = ? AND user_id = ?',
    [conversationId, req.user.id],
    (err, conversation) => {
      if (err || !conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }

      // Get all messages for this conversation
      db.all(
        'SELECT * FROM conversation_messages WHERE conversation_id = ? ORDER BY created_at ASC',
        [conversationId],
        (err, messages) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to fetch messages' });
          }

          res.json({
            ...conversation,
            messages: messages
          });
        }
      );
    }
  );
});

// Create a new conversation
router.post('/', authenticateToken, (req, res) => {
  const { title, firstMessage } = req.body;

  db.run(
    'INSERT INTO conversations (user_id, title) VALUES (?, ?)',
    [req.user.id, title || 'New Conversation'],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to create conversation' });
      }

      const conversationId = this.lastID;

      // Add the first message if provided
      if (firstMessage) {
        db.run(
          'INSERT INTO conversation_messages (conversation_id, role, content) VALUES (?, ?, ?)',
          [conversationId, 'user', firstMessage],
          (err) => {
            if (err) console.error('Error adding first message:', err);
          }
        );
      }

      res.json({
        id: conversationId,
        user_id: req.user.id,
        title: title || 'New Conversation',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
  );
});

// Add a message to a conversation
router.post('/:id/messages', authenticateToken, (req, res) => {
  const conversationId = req.params.id;
  const { role, content } = req.body;

  // Verify conversation belongs to user
  db.get(
    'SELECT * FROM conversations WHERE id = ? AND user_id = ?',
    [conversationId, req.user.id],
    (err, conversation) => {
      if (err || !conversation) {
        return res.status(404).json({ error: 'Conversation not found' });
      }

      // Add the message
      db.run(
        'INSERT INTO conversation_messages (conversation_id, role, content) VALUES (?, ?, ?)',
        [conversationId, role, content],
        function(err) {
          if (err) {
            return res.status(500).json({ error: 'Failed to add message' });
          }

          // Update conversation's updated_at timestamp
          db.run(
            'UPDATE conversations SET updated_at = CURRENT_TIMESTAMP WHERE id = ?',
            [conversationId]
          );

          res.json({
            id: this.lastID,
            conversation_id: conversationId,
            role,
            content,
            created_at: new Date().toISOString()
          });
        }
      );
    }
  );
});

// Update conversation title
router.patch('/:id', authenticateToken, (req, res) => {
  const conversationId = req.params.id;
  const { title } = req.body;

  db.run(
    'UPDATE conversations SET title = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
    [title, conversationId, req.user.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to update conversation' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Conversation not found' });
      }

      res.json({ success: true });
    }
  );
});

// Delete a conversation
router.delete('/:id', authenticateToken, (req, res) => {
  const conversationId = req.params.id;

  db.run(
    'DELETE FROM conversations WHERE id = ? AND user_id = ?',
    [conversationId, req.user.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete conversation' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Conversation not found' });
      }

      res.json({ success: true });
    }
  );
});

export default router;
