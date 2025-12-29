import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

// Create axios instance with optimized defaults
const api = axios.create({
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/auth'
    }
    return Promise.reject(error)
  }
)

export const useOptimizedAuth = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)
        setLoading(false)
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setLoading(false)
      }
    } else {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password })
      const { user: userData, token } = response.data
      
      // Store in localStorage for persistence
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      
      setUser(userData)
      return { success: true, user: userData }
    } catch (error) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed' 
      }
    }
  }, [])

  const register = useCallback(async (email, password, name) => {
    try {
      const response = await api.post('/api/auth/register', { email, password, name })
      const { user: userData, token } = response.data
      
      // Store in localStorage for persistence
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      
      setUser(userData)
      return { success: true, user: userData }
    } catch (error) {
      console.error('Registration error:', error)
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registration failed' 
      }
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }, [])

  // Optimized data fetching functions
  const fetchDashboardData = useCallback(async (level = 'all') => {
    try {
      const [lessonsRes, progressRes, statsRes] = await Promise.all([
        api.get(`/api/lessons${level !== 'all' ? `?level=${level}` : ''}`),
        api.get('/api/progress'),
        api.get('/api/analytics/dashboard')
      ])

      return {
        lessons: lessonsRes.data,
        progress: progressRes.data,
        stats: statsRes.data
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      throw error
    }
  }, [])

  const fetchLessonData = useCallback(async (lessonId) => {
    try {
      const [lessonRes, progressRes] = await Promise.all([
        api.get(`/api/lessons/${lessonId}`),
        api.get(`/api/progress/lesson/${lessonId}`)
      ])

      return {
        lesson: lessonRes.data,
        progress: progressRes.data
      }
    } catch (error) {
      console.error('Error fetching lesson data:', error)
      throw error
    }
  }, [])

  const updateProgress = useCallback(async (lessonId, progressData) => {
    try {
      const response = await api.post(`/api/progress/lesson/${lessonId}`, progressData)
      return response.data
    } catch (error) {
      console.error('Error updating progress:', error)
      throw error
    }
  }, [])

  return {
    user,
    loading,
    login,
    register,
    logout,
    fetchDashboardData,
    fetchLessonData,
    updateProgress,
    api // Export api instance for other components
  }
}

export default useOptimizedAuth