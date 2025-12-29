import dotenv from 'dotenv'
dotenv.config()

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('⚠️  Supabase credentials not found, will use SQLite fallback')
}

// Simple fetch-based Supabase client for server use
class SupabaseClient {
  constructor(url, key) {
    this.url = url
    this.key = key
    this.available = !!(url && key)
  }

  async request(table, method = 'GET', data = null, query = '') {
    if (!this.available) {
      throw new Error('Supabase not configured')
    }

    const url = `${this.url}/rest/v1/${table}${query ? '?' + query : ''}`
    const headers = {
      'apikey': this.key,
      'Authorization': `Bearer ${this.key}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation'
    }

    const options = { method, headers }
    if (data) options.body = JSON.stringify(data)

    try {
      const response = await fetch(url, options)
      
      if (!response.ok) {
        const error = await response.text()
        throw new Error(`Supabase error: ${response.status} ${error}`)
      }

      return response.json()
    } catch (error) {
      console.error('Supabase request failed:', error.message)
      throw error
    }
  }

  // Lessons methods
  async getLessons(level = null) {
    let query = 'select=*&order=module_number.asc,lesson_number.asc'
    if (level) query += `&level=eq.${level}`
    return this.request('lessons', 'GET', null, query)
  }

  async getLessonsByModule(moduleNumber) {
    const query = `select=*&module_number=eq.${moduleNumber}&order=lesson_number.asc`
    return this.request('lessons', 'GET', null, query)
  }

  async getLesson(id) {
    const query = `select=*&id=eq.${id}`
    const result = await this.request('lessons', 'GET', null, query)
    return result[0] || null
  }

  // Progress methods
  async getUserProgress(userId) {
    const query = `select=*&user_id=eq.${userId}`
    return this.request('user_progress', 'GET', null, query)
  }

  async updateProgress(userId, lessonId, progressData) {
    const data = {
      user_id: userId,
      lesson_id: lessonId,
      ...progressData,
      updated_at: new Date().toISOString()
    }
    
    // Try to update first, then insert if not exists
    try {
      const query = `user_id=eq.${userId}&lesson_id=eq.${lessonId}`
      const existing = await this.request('user_progress', 'GET', null, query)
      
      if (existing.length > 0) {
        // Update existing
        const updateQuery = `id=eq.${existing[0].id}`
        return this.request('user_progress', 'PATCH', data, updateQuery)
      } else {
        // Insert new
        return this.request('user_progress', 'POST', [data])
      }
    } catch (error) {
      console.error('Progress update error:', error)
      throw error
    }
  }

  // Quiz methods
  async getQuizByLesson(lessonId) {
    const query = `select=*&lesson_id=eq.${lessonId}`
    const result = await this.request('quizzes', 'GET', null, query)
    return result[0] || null
  }

  async saveQuizAttempt(userId, quizId, score, answers) {
    const data = {
      user_id: userId,
      quiz_id: quizId,
      score,
      answers,
      completed_at: new Date().toISOString()
    }
    return this.request('quiz_attempts', 'POST', [data])
  }

  // User methods (for compatibility)
  async getUserByEmail(email) {
    const query = `select=*&email=eq.${email}`
    const result = await this.request('users', 'GET', null, query)
    return result[0] || null
  }

  async createUser(userData) {
    return this.request('users', 'POST', [userData])
  }
}

export const supabaseClient = new SupabaseClient(supabaseUrl, supabaseServiceKey)
export default supabaseClient