import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Only load .env file locally — Vercel injects env vars automatically
if (process.env.VERCEL !== '1') {
  dotenv.config({ path: join(__dirname, '../../../.env') })
}

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase env vars: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set')
}

// Server-side admin client — guarded so missing env vars don't crash the module on load
export const supabaseAdmin = (supabaseUrl && supabaseServiceKey)
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      },
      db: {
        schema: 'public'
      },
      global: {
        headers: {
          'Connection': 'keep-alive',
          'Cache-Control': 'no-cache'
        }
      },
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      }
    })
  : null

// Regular client for user operations
export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      },
      global: {
        headers: {
          'Connection': 'keep-alive'
        }
      },
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      }
    })
  : null

// Helper function to get user ID from auth user ID
export const getUserIdFromAuth = async (authUserId) => {
  if (!supabaseAdmin) return null
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('auth_user_id', authUserId)
    .single()
  
  if (error) {
    console.error('Error getting user ID:', error)
    return null
  }
  
  return data?.id || null
}

// Helper function to ensure user exists
export const ensureUserExists = async (authUser) => {
  if (!authUser || !supabaseAdmin) return null
  
  // Check if user already exists
  const { data: existingUser } = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('auth_user_id', authUser.id)
    .single()
  
  if (existingUser) return existingUser.id
  
  // Create user if doesn't exist
  const { data: newUser, error } = await supabaseAdmin
    .from('users')
    .insert({
      auth_user_id: authUser.id,
      email: authUser.email,
      name: authUser.user_metadata?.name || authUser.email.split('@')[0],
      email_verified: authUser.email_confirmed_at ? true : false
    })
    .select('id')
    .single()
  
  if (error) {
    console.error('Error creating user:', error)
    return null
  }
  
  return newUser.id
}

export default supabaseAdmin
