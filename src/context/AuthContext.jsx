import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { isSuperadmin as checkIsSuperadmin } from '../constants/roles'

const AuthContext = createContext({
  session: null,
  user: null,
  role: null,
  isSuperadmin: false,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {}
})

async function fetchUserRole(userId) {
  const { data, error } = await supabase.from('profiles').select('role').eq('id', userId).maybeSingle()

  if (error) {
    console.error('Failed to load user profile:', error.message)
    return null
  }

  return data?.role ?? null
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const applySession = async (nextSession) => {
      if (!mounted) return

      setSession(nextSession)
      setUser(nextSession?.user ?? null)

      if (nextSession?.user) {
        const nextRole = await fetchUserRole(nextSession.user.id)
        if (mounted) {
          setRole(nextRole)
          setLoading(false)
        }
      } else {
        setRole(null)
        setLoading(false)
      }
    }

    const init = async () => {
      const {
        data: { session: initialSession }
      } = await supabase.auth.getSession()
      await applySession(initialSession)
    }

    init()

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setLoading(true)
      applySession(nextSession)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const value = useMemo(
    () => ({
      session,
      user,
      role,
      isSuperadmin: checkIsSuperadmin(role),
      loading,
      signIn: (payload) => supabase.auth.signInWithPassword(payload),
      signUp: (payload) => supabase.auth.signUp(payload),
      signOut: () => supabase.auth.signOut()
    }),
    [session, user, role, loading]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
