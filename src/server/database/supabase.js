import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '../../../.env') })

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Server-side client with service role key for admin operations (optimized)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
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

// Regular client for user operations (optimized)
export const supabase = createClient(
  supabaseUrl, 
  process.env.SUPABASE_ANON_KEY,
  {
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
  }
)

// Helper function to get user ID from auth user ID
export const getUserIdFromAuth = async (authUserId) => {
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
  if (!authUser) return null
  
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