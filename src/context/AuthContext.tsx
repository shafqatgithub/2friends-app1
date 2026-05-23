import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type User = {
  email: string
  name: string
}

type AuthContextValue = {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)
const STORAGE_KEY = '2friends-user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as User) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else localStorage.removeItem(STORAGE_KEY)
  }, [user])

  const login = useCallback(async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 400))
    const name = email.split('@')[0] || 'Friend'
    setUser({ email, name: name.charAt(0).toUpperCase() + name.slice(1) })
    return true
  }, [])

  const signup = useCallback(async (name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 400))
    setUser({ email, name })
    return true
  }, [])

  const logout = useCallback(() => setUser(null), [])

  const value = useMemo(
    () => ({ user, login, signup, logout }),
    [user, login, signup, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
