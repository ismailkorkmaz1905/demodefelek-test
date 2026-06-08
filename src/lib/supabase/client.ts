import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export async function ensureAnonymousSession() {
  if (!supabase) return null
  const { data } = await supabase.auth.getSession()
  if (data.session) return data.session
  const result = await supabase.auth.signInAnonymously()
  return result.data.session
}
