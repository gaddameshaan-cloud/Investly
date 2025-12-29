import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables FIRST before importing anything else
const result = dotenv.config({ path: join(__dirname, '../../.env') });

if (result.error) {
  console.error('❌ Error loading .env file:', result.error);
} else {
  console.log('✅ .env file loaded successfully');
}

import express from 'express';
import cors from 'cors';

// Check if Supabase is configured
const isSupabaseConfigured = process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY;

// Import routes - hybrid routes will fallback to SQLite if Supabase not available
import authRoutes from './routes/auth-supabase.js';
import aiRoutes from './routes/ai.js';
import analyticsRoutes from './routes/analytics-supabase.js';
import conversationsRoutes from './routes/conversations.js';
import contactRoutes from './routes/contact.js';
import userRoutes from './routes/user.js';

// Import hybrid routes for lessons and progress
import lessonRoutes from './routes/lessons-supabase.js';
import progressRoutes from './routes/progress-supabase.js';
import quizRoutes from './routes/quizzes-supabase.js';

// Using Supabase PostgreSQL database only
console.log('🚀 Using Supabase PostgreSQL database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    database: isSupabaseConfigured ? 'supabase-hybrid' : 'sqlite',
    supabase_configured: isSupabaseConfigured,
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/conversations', conversationsRoutes);
app.use('/api/contact', contactRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Database: Supabase PostgreSQL`);
  console.log(`✅ All data stored in cloud database`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});
