import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { useAuth } from '../context/AuthContext'

type AuthView = 'login' | 'signup'

export function LoginPage() {
  const navigate = useNavigate()
  const { login, signup } = useAuth()
  const [view, setView] = useState<AuthView>('login')
  const [loading, setLoading] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    terms: false,
  })

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await login(loginForm.email, loginForm.password)
    setLoading(false)
    navigate('/')
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (!signupForm.terms) return
    setLoading(true)
    const name = `${signupForm.firstName} ${signupForm.lastName}`.trim()
    await signup(name, signupForm.email, signupForm.password)
    setLoading(false)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-surface shadow-sm pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-margin-mobile py-base">
          <Link to="/" className="text-[26px] font-bold tracking-tight text-primary">
            2friends
          </Link>
          <button
            type="button"
            className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-variant/50"
            aria-label="Help"
          >
            <Icon name="help_outline" />
          </button>
        </div>
      </header>

      <main className="relative flex flex-grow flex-col items-center overflow-hidden px-margin-mobile py-stack-lg">
        <div className="pointer-events-none absolute top-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-10%] left-[-10%] h-[300px] w-[300px] rounded-full bg-secondary/5 blur-3xl" />

        <div className="z-10 w-full max-w-[440px]">
          {view === 'login' ? (
            <div className="space-y-stack-lg">
              <div className="space-y-stack-sm text-center">
                <h2 className="text-2xl font-semibold text-primary">Welcome Back</h2>
                <p className="text-on-surface-variant">Log in to your account and explore</p>
              </div>
              <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-margin-mobile shadow-lg">
                <form className="space-y-stack-md" onSubmit={handleLogin}>
                  <div>
                    <label className="mb-1 ml-1 block text-sm font-semibold text-on-surface-variant">
                      Email
                    </label>
                    <div className="relative">
                      <Icon
                        name="mail"
                        className="absolute top-1/2 left-3 -translate-y-1/2 text-outline"
                      />
                      <input
                        required
                        type="email"
                        placeholder="hello@2friends.com"
                        value={loginForm.email}
                        onChange={(e) =>
                          setLoginForm({ ...loginForm, email: e.target.value })
                        }
                        className="w-full rounded-lg border border-outline-variant bg-surface py-3 pr-4 pl-10 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 ml-1 flex items-center justify-between">
                      <label className="block text-sm font-semibold text-on-surface-variant">
                        Password
                      </label>
                      <button type="button" className="text-xs text-secondary hover:underline">
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Icon
                        name="lock"
                        className="absolute top-1/2 left-3 -translate-y-1/2 text-outline"
                      />
                      <input
                        required
                        type="password"
                        placeholder="••••••••"
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm({ ...loginForm, password: e.target.value })
                        }
                        className="w-full rounded-lg border border-outline-variant bg-surface py-3 pr-12 pl-10 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 text-sm font-semibold text-on-primary shadow-md transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60"
                  >
                    {loading ? 'Signing in…' : 'Login'}
                  </button>
                </form>
              </div>
              <p className="text-center text-sm text-on-surface-variant">
                Don&apos;t have an account?{' '}
                <button
                  type="button"
                  onClick={() => setView('signup')}
                  className="ml-1 font-semibold text-secondary hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </div>
          ) : (
            <div className="space-y-stack-lg">
              <div className="space-y-stack-sm text-center">
                <h2 className="text-2xl font-semibold text-primary">Join 2friends</h2>
                <p className="text-on-surface-variant">Create your account to start shopping</p>
              </div>
              <div className="rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-margin-mobile shadow-lg">
                <form className="space-y-stack-md" onSubmit={handleSignup}>
                  <div className="grid grid-cols-2 gap-base">
                    <input
                      required
                      placeholder="First name"
                      value={signupForm.firstName}
                      onChange={(e) =>
                        setSignupForm({ ...signupForm, firstName: e.target.value })
                      }
                      className="rounded-lg border border-outline-variant bg-surface px-4 py-3 outline-none focus:border-primary"
                    />
                    <input
                      required
                      placeholder="Last name"
                      value={signupForm.lastName}
                      onChange={(e) =>
                        setSignupForm({ ...signupForm, lastName: e.target.value })
                      }
                      className="rounded-lg border border-outline-variant bg-surface px-4 py-3 outline-none focus:border-primary"
                    />
                  </div>
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    value={signupForm.email}
                    onChange={(e) =>
                      setSignupForm({ ...signupForm, email: e.target.value })
                    }
                    className="w-full rounded-lg border border-outline-variant bg-surface px-4 py-3 outline-none focus:border-primary"
                  />
                  <input
                    required
                    type="password"
                    minLength={8}
                    placeholder="At least 8 characters"
                    value={signupForm.password}
                    onChange={(e) =>
                      setSignupForm({ ...signupForm, password: e.target.value })
                    }
                    className="w-full rounded-lg border border-outline-variant bg-surface px-4 py-3 outline-none focus:border-primary"
                  />
                  <label className="flex items-start gap-2 pt-2 text-sm text-on-surface-variant">
                    <input
                      type="checkbox"
                      checked={signupForm.terms}
                      onChange={(e) =>
                        setSignupForm({ ...signupForm, terms: e.target.checked })
                      }
                      className="mt-1 rounded text-primary"
                    />
                    I agree to the Terms of Service and Privacy Policy.
                  </label>
                  <button
                    type="submit"
                    disabled={loading || !signupForm.terms}
                    className="mt-4 w-full rounded-lg bg-secondary py-4 text-sm font-semibold text-on-secondary shadow-md active:scale-[0.98] disabled:opacity-60"
                  >
                    {loading ? 'Creating account…' : 'Create Account'}
                  </button>
                </form>
              </div>
              <p className="text-center text-sm text-on-surface-variant">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setView('login')}
                  className="ml-1 font-semibold text-secondary hover:underline"
                >
                  Log In
                </button>
              </p>
            </div>
          )}
        </div>
      </main>

      <footer className="px-margin-mobile py-stack-lg text-center text-sm text-outline">
        <p>© 2024 2friends. All rights reserved.</p>
      </footer>
    </div>
  )
}
