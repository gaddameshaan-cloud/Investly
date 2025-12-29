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

// Import Supabase routes
import authRoutes from './routes/auth-supabase.js';
import lessonRoutes from './routes/lessons-supabase.js';
import progressRoutes from './routes/progress-supabase.js';
import quizRoutes from './routes/quizzes-supabase.js';

// Import existing routes that don't need major changes
import aiRoutes from './routes/ai.js';
import analyticsRoutes from './routes/analytics.js';
import conversationsRoutes from './routes/conversations.js';
import contactRoutes from './routes/contact.js';

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

// Use Supabase routes
app.use('/api/auth', authRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/quizzes', quizRoutes);

// Use existing routes (these may need updates for Supabase later)
app.use('/api/ai', aiRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/conversations', conversationsRoutes);
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    database: 'supabase',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Database: Supabase PostgreSQL`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});