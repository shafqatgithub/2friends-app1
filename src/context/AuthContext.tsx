import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { isSupabaseConfigured } from '../lib/env'
import { getSupabase } from '../lib/supabase'
import { initFirebase, trackEvent } from '../lib/firebase'

export type User = {
  id: string
  email: string
  name: string
}

type AuthContextValue = {
  user: User | null
  loading: boolean
  isDemoMode: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)
const DEMO_STORAGE_KEY = '2friends-user'

function mapSupabaseUser(id: string, email: string | undefined, metadataName?: string): User {
  const fallback = email?.split('@')[0] || 'Friend'
  const name = metadataName || fallback.charAt(0).toUpperCase() + fallback.slice(1)
  return { id, email: email ?? '', name }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const isDemoMode = !isSupabaseConfigured

  useEffect(() => {
    initFirebase()

    if (isDemoMode) {
      try {
        const raw = localStorage.getItem(DEMO_STORAGE_KEY)
        if (raw) setUser(JSON.parse(raw) as User)
      } catch {
        /* ignore */
      }
      setLoading(false)
      return
    }

    const supabase = getSupabase()
    if (!supabase) {
      setLoading(false)
      return
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const meta = session.user.user_metadata?.full_name as string | undefined
        setUser(mapSupabaseUser(session.user.id, session.user.email, meta))
      }
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const meta = session.user.user_metadata?.full_name as string | undefined
        setUser(mapSupabaseUser(session.user.id, session.user.email, meta))
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [isDemoMode])

  useEffect(() => {
    if (!isDemoMode || !user) return
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(user))
  }, [user, isDemoMode])

  const login = useCallback(
    async (email: string, password: string) => {
      if (isDemoMode) {
        await new Promise((r) => setTimeout(r, 400))
        const demoUser = mapSupabaseUser('demo', email)
        setUser(demoUser)
        localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(demoUser))
        return
      }

      const supabase = getSupabase()
      if (!supabase) throw new Error('Supabase is not configured')

      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw new Error(error.message)

      const u = data.user
      setUser(mapSupabaseUser(u.id, u.email, u.user_metadata?.full_name as string))
      trackEvent('login', { method: 'email' })
    },
    [isDemoMode],
  )

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      if (isDemoMode) {
        await new Promise((r) => setTimeout(r, 400))
        const demoUser = { id: 'demo', email, name }
        setUser(demoUser)
        localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(demoUser))
        return
      }

      const supabase = getSupabase()
      if (!supabase) throw new Error('Supabase is not configured')

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      })
      if (error) throw new Error(error.message)

      if (data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          full_name: name,
          email,
        } as Record<string, string>)
        setUser(mapSupabaseUser(data.user.id, email, name))
        trackEvent('sign_up', { method: 'email' })
      }
    },
    [isDemoMode],
  )

  const resetPassword = useCallback(
    async (email: string) => {
      if (!email) throw new Error('Please enter your email first.')

      if (isDemoMode) {
        await new Promise((r) => setTimeout(r, 500))
        return
      }

      const supabase = getSupabase()
      if (!supabase) throw new Error('Supabase is not configured')

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/login',
      })

      if (error) throw new Error(error.message)
      trackEvent('password_reset_requested', { method: 'email' })
    },
    [isDemoMode],
  )

  const logout = useCallback(async () => {
    if (isDemoMode) {
      setUser(null)
      localStorage.removeItem(DEMO_STORAGE_KEY)
      return
    }
    const supabase = getSupabase()
    if (supabase) await supabase.auth.signOut()
    setUser(null)
  }, [isDemoMode])

  const value = useMemo(
    () => ({ user, loading, isDemoMode, login, signup, resetPassword, logout }),
    [user, loading, isDemoMode, login, signup, resetPassword, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}