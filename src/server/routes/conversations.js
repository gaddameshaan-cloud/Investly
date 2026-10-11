import express from 'express';
import { supabaseAdmin } from '../database/supabase.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all conversations for a user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('conversations')
      .select(`*, conversation_messages(count)`)
      .eq('user_id', req.user.id)
      .order('updated_at', { ascending: false });

    if (error) return res.status(500).json({ error: 'Failed to fetch conversations' });
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get a specific conversation with all messages
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { data: conversation, error } = await supabaseAdmin
      .from('conversations')
      .select('*')
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .single();

    if (error || !conversation) return res.status(404).json({ error: 'Conversation not found' });

    const { data: messages } = await supabaseAdmin
      .from('conversation_messages')
      .select('*')
      .eq('conversation_id', req.params.id)
      .order('created_at', { ascending: true });

    res.json({ ...conversation, messages: messages || [] });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new conversation
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, firstMessage } = req.body;

    const { data: conversation, error } = await supabaseAdmin
      .from('conversations')
      .insert({ user_id: req.user.id, title: title || 'New Conversation' })
      .select()
      .single();

    if (error) return res.status(500).json({ error: 'Failed to create conversation' });

    if (firstMessage) {
      await supabaseAdmin.from('conversation_messages').insert({
        conversation_id: conversation.id,
        role: 'user',
        content: firstMessage
      });
    }

    res.json(conversation);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a message to a conversation
router.post('/:id/messages', authenticateToken, async (req, res) => {
  try {
    const { role, content } = req.body;

    const { data: conversation, error: convError } = await supabaseAdmin
      .from('conversations')
      .select('id')
      .eq('id', req.params.id)
      .eq('user_id', req.user.id)
      .single();

    if (convError || !conversation) return res.status(404).json({ error: 'Conversation not found' });

    const { data: message, error } = await supabaseAdmin
      .from('conversation_messages')
      .insert({ conversation_id: req.params.id, role, content })
      .select()
      .single();

    if (error) return res.status(500).json({ error: 'Failed to add message' });

    await supabaseAdmin
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', req.params.id);

    res.json(message);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update conversation title
router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    const { title } = req.body;
    const { error } = await supabaseAdmin
      .from('conversations')
      .update({ title, updated_at: new Date().toISOString() })
      .eq('id', req.params.id)
      .eq('user_id', req.user.id);

    if (error) return res.status(500).json({ error: 'Failed to update conversation' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a conversation
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { error } = await supabaseAdmin
      .from('conversations')
      .delete()
      .eq('id', req.params.id)
      .eq('user_id', req.user.id);

    if (error) return res.status(500).json({ error: 'Failed to delete conversation' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
