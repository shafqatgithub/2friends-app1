import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { useAuth } from '../context/AuthContext'

type AuthView = 'login' | 'signup'

export function LoginPage() {
  const navigate = useNavigate()
  const { login, signup, resetPassword, isDemoMode } = useAuth()
  const [view, setView] = useState<AuthView>('login')
  const [loading, setLoading] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    terms: false,
  })

  async function handleLogin(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      await login(loginForm.email, loginForm.password)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleSignup(e: FormEvent) {
    e.preventDefault()
    if (!signupForm.terms) return

    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const name = `${signupForm.firstName} ${signupForm.lastName}`.trim()
      await signup(name, signupForm.email, signupForm.password)

      if (!isDemoMode) {
        setSuccess('Account created! You can login now.')
        setView('login')
        setLoginForm({ email: signupForm.email, password: '' })
        return
      }

      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleForgotPassword() {
    setError(null)
    setSuccess(null)

    const email =
      loginForm.email.trim() ||
      window.prompt('Enter your email address for password reset:')?.trim() ||
      ''

    if (!email) {
      setError('Please enter your email address first.')
      return
    }

    setResetLoading(true)

    try {
      await resetPassword(email)
      setSuccess('Password reset link sent. Please check your email inbox/spam.')
      setLoginForm((prev) => ({ ...prev, email }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Password reset failed')
    } finally {
      setResetLoading(false)
    }
  }

  function showHelp() {
    window.alert(
      'Need help?\n\n1. Enter your email and password to login.\n2. Use Forgot Password to receive a reset link.\n3. For support, contact 2Friends customer care.',
    )
  }

  return (
    <div className="min-h-[100dvh] bg-background">
      <header className="sticky top-0 z-50 bg-surface pt-[env(safe-area-inset-top)] shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-margin-mobile py-base">
          <Link to="/" className="text-[26px] font-bold tracking-tight text-primary">
            2friends
          </Link>

          <button
            type="button"
            onClick={showHelp}
            className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-surface-variant/50 active:scale-95"
            aria-label="Help"
          >
            <Icon name="help_outline" />
          </button>
        </div>
      </header>

      <main className="relative flex flex-col items-center overflow-hidden px-margin-mobile py-stack-lg">
        <div className="pointer-events-none absolute top-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-10%] left-[-10%] h-[300px] w-[300px] rounded-full bg-secondary/5 blur-3xl" />

        <div className="z-10 w-full max-w-[440px]">
          {isDemoMode && (
            <p className="mb-stack-md rounded-lg border border-secondary/30 bg-secondary-fixed/30 px-4 py-2 text-center text-sm text-on-surface-variant">
              Demo mode — add Supabase keys in <code className="text-primary">.env</code> for real login.
            </p>
          )}

          {error && (
            <p className="mb-stack-md rounded-lg border border-error/30 bg-error/10 px-4 py-3 text-center text-sm text-error">
              {error}
            </p>
          )}

          {success && (
            <p className="mb-stack-md rounded-lg border border-primary/20 bg-primary/10 px-4 py-3 text-center text-sm text-primary">
              {success}
            </p>
          )}

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
                      <Icon name="mail" className="absolute top-1/2 left-3 -translate-y-1/2 text-outline" />
                      <input
                        required
                        type="email"
                        placeholder="hello@2friends.com"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        className="w-full rounded-lg border border-outline-variant bg-surface py-3 pr-4 pl-10 outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mb-1 ml-1 flex items-center justify-between">
                      <label className="block text-sm font-semibold text-on-surface-variant">
                        Password
                      </label>

                      <button
                        type="button"
                        onClick={handleForgotPassword}
                        disabled={resetLoading}
                        className="text-xs font-semibold text-secondary hover:underline disabled:opacity-60"
                      >
                        {resetLoading ? 'Sending…' : 'Forgot Password?'}
                      </button>
                    </div>

                    <div className="relative">
                      <Icon name="lock" className="absolute top-1/2 left-3 -translate-y-1/2 text-outline" />
                      <input
                        required
                        type="password"
                        placeholder="••••••••"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
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
                  onClick={() => {
                    setError(null)
                    setSuccess(null)
                    setView('signup')
                  }}
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
                      onChange={(e) => setSignupForm({ ...signupForm, firstName: e.target.value })}
                      className="rounded-lg border border-outline-variant bg-surface px-4 py-3 outline-none focus:border-primary"
                    />
                    <input
                      required
                      placeholder="Last name"
                      value={signupForm.lastName}
                      onChange={(e) => setSignupForm({ ...signupForm, lastName: e.target.value })}
                      className="rounded-lg border border-outline-variant bg-surface px-4 py-3 outline-none focus:border-primary"
                    />
                  </div>

                  <input
                    required
                    type="email"
                    placeholder="Email"
                    value={signupForm.email}
                    onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                    className="w-full rounded-lg border border-outline-variant bg-surface px-4 py-3 outline-none focus:border-primary"
                  />

                  <input
                    required
                    type="password"
                    minLength={8}
                    placeholder="At least 8 characters"
                    value={signupForm.password}
                    onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                    className="w-full rounded-lg border border-outline-variant bg-surface px-4 py-3 outline-none focus:border-primary"
                  />

                  <label className="flex items-start gap-2 pt-2 text-sm text-on-surface-variant">
                    <input
                      type="checkbox"
                      checked={signupForm.terms}
                      onChange={(e) => setSignupForm({ ...signupForm, terms: e.target.checked })}
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
                  onClick={() => {
                    setError(null)
                    setSuccess(null)
                    setView('login')
                  }}
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
        <p>© 2026 2friends. All rights reserved.</p>
      </footer>
    </div>
  )
}