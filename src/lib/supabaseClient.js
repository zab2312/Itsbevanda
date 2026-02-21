import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase environment variables are missing!')
  console.error('Please create a .env file with:')
  console.error('  VITE_SUPABASE_URL=your_supabase_url')
  console.error('  VITE_SUPABASE_ANON_KEY=your_supabase_anon_key')
}

// Create client with fallback empty strings to prevent crashes
// but operations will fail gracefully
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: true,
      detectSessionInUrl: true
    }
  }
)

