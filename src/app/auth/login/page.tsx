"use client"

import { useState } from "react"
import Link from "next/link"
import { signIn } from "next-auth/react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('')
  const [identifierType, setIdentifierType] = useState<'email' | 'phone' | null>(null)
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const detectInputType = (value: string) => {
    // Email regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    // Phone regex pattern (matches 10 digits, optionally starting with +)
    const phonePattern = /^\+?\d{10,12}$/

    if (emailPattern.test(value)) {
      return 'email'
    } else if (phonePattern.test(value.replace(/\D/g, ''))) {
      return 'phone'
    }
    return null
  }

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setIdentifier(value)
    setError('')

    // Auto-detect input type as user types
    const type = detectInputType(value)
    setIdentifierType(type)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setError('')
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!identifier || !password) {
      setError('Please enter your email/phone and password')
      return
    }
    setLoading(true)
    setError('')
    try {
      const result = await signIn('credentials', {
        email: identifierType === 'email' ? identifier : '',
        phone: identifierType === 'phone' ? identifier : '',
        password: password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
      } else {
        window.location.href = '/dashboard'
      }
    } catch {
      setError('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Link href="/" className="block">
            <h1 className="auth-logo">CredLink</h1>
          </Link>
          <h2 className="auth-title">
            Sign in to your account
          </h2>
          <p className="auth-subtitle">
            Or{' '}
            <Link href="/auth/signup" className="text-primary-green hover:text-primary-green-dark">
              create a new account
            </Link>
          </p>
        </div>
        <form onSubmit={handleLogin} className="auth-form space-y-6" suppressHydrationWarning>
          <div className="auth-input-group">
            <label htmlFor="identifier" className="label">
              Email or Phone Number
            </label>
            <div className="mt-1">
              <input
                id="identifier"
                name="identifier"
                type="text"
                autoComplete="email tel"
                required
                value={identifier}
                onChange={handleIdentifierChange}
                className="auth-input"
                placeholder="Enter email or phone number"
              />
            </div>
          </div>
          <div className="auth-input-group">
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={handlePasswordChange}
                className="auth-input"
                placeholder="Enter your password"
              />
            </div>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <Button
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <div className="auth-divider -mb-2">
          <span className="auth-divider-text">Or continue with</span>
        </div>

        <div className="mt-4">
          <button
            onClick={() => signIn('google', { 
              callbackUrl: '/dashboard',
              redirect: true
            })}
            type="button"
            className="w-full flex items-center justify-center px-6 py-4 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 h-14"
            suppressHydrationWarning
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="ml-2">Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  )
}
