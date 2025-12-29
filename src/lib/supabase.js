import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://omiyrlxvvvmeenxbrnor.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9taXlybHh2dnZtZWVueGJybm9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY3NzQ1ODEsImV4cCI6MjA4MjM1MDU4MX0.1VO_ioLyqcOZ8ejYz3fFrmKAKHXWvRSPOwurOFomV7A'

// Direct frontend Supabase client - bypasses backend entirely
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Fast data fetching functions - direct from Supabase
export const fetchLessons = async (level = null) => {
  let query = supabase
    .from('lessons')
    .select('id, title, level, module_number, lesson_number, estimated_time')
    .order('module_number')
    .order('lesson_number')
  
  if (level && level !== 'all') {
    query = query.eq('level', level)
  }
  
  const { data, error } = await query
  if (error) throw error
  return data || []
}

export const fetchUserProgress = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []
  
  const { data, error } = await supabase
    .from('user_progress')
    .select('lesson_id, completed, score, completed_at')
    .eq('user_id', user.id)
  
  if (error) throw error
  return data || []
}

export const fetchDashboardStats = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  
  // Parallel queries for maximum speed
  const [lessonsCount, userProgress, quizScores] = await Promise.all([
    supabase.from('lessons').select('id', { count: 'exact', head: true }),
    supabase.from('user_progress').select('completed, score').eq('user_id', user.id),
    supabase.from('quiz_attempts').select('score').eq('user_id', user.id)
  ])
  
  const totalLessons = lessonsCount.count || 0
  const progress = userProgress.data || []
  const scores = quizScores.data || []
  
  const completedLessons = progress.filter(p => p.completed).length
  const averageScore = scores.length > 0 
    ? Math.round(scores.reduce((sum, s) => sum + (s.score || 0), 0) / scores.length)
    : 0
  
  return {
    totalLessons,
    completedLessons,
    averageScore,
    completionRate: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
    totalTimeSpent: 0
  }
}

export const updateLessonProgress = async (lessonId, progressData) => {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')
  
  const { data, error } = await supabase
    .from('user_progress')
    .upsert({
      user_id: user.id,
      lesson_id: lessonId,
      ...progressData,
      completed_at: progressData.completed ? new Date().toISOString() : null
    }, { onConflict: 'user_id,lesson_id' })
  
  if (error) throw error
  return data
}

export default supabase