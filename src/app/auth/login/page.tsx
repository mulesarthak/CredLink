"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/hooks/use-auth"
import { toast } from "react-hot-toast"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
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
    
    // Only support email login for now
    if (identifierType !== 'email') {
      setError('Please enter a valid email address')
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      console.log('🔐 Attempting login for:', identifier)
      await login(identifier, password)
      console.log('✅ Login hook completed successfully')
      toast.success('Login successful!')
      console.log('🔄 Redirecting to dashboard...')
      
      // Use window.location for a full page reload to ensure cookies are recognized
      window.location.href = '/dashboard'
    } catch (err: any) {
      console.error('❌ Login error:', err)
      const errorMessage = err.message || 'Login failed. Please try again.'
      setError(errorMessage)
      toast.error(errorMessage)
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
            suppressHydrationWarning
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        {/* Google Sign-in can be added later when OAuth is configured */}
      </div>
    </div>
  )
}
