"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Mail, Eye, EyeOff, Loader2, Check } from "lucide-react"
import { toast } from "react-hot-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { signupSchema } from "@/lib/validations/auth"
import type { z } from "zod"

type SignupForm = z.infer<typeof signupSchema>

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [identifier, setIdentifier] = useState('')
  const [identifierType, setIdentifierType] = useState<'email' | 'phone' | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      password: '',
      confirmPassword: ''
    }
  })

  // Detect input type
  const detectInputType = (value: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phonePattern = /^\d{10}$/
    if (emailPattern.test(value)) return 'email'
    if (phonePattern.test(value)) return 'phone'
    return null
  }

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setIdentifier(value)
    setError('')
    const type = detectInputType(value)
    setIdentifierType(type)
  }

  const onSubmit = async (data: SignupForm) => {
    if (identifierType === 'phone') {
      // Simulate sending OTP and redirect to OTP page
      toast.loading('Sending OTP...')
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success('OTP sent!')
      router.push(`/auth/verify-otp?phone=${encodeURIComponent(identifier)}`)
      return
    }
    // For email signup, continue as before
    try {
      const loadingToast = toast.loading('Creating your account...')
      
      // Send register payload to backend JSON API
      await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: identifier,
          password: data.password,
          fullName: data.fullName,
        }),
      })

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: identifier,
          password: data.password,
          fullName: data.fullName,
        }),
      })

      const result = await response.json()
      toast.dismiss(loadingToast)

      if (!response.ok) {
        toast.error(result.error || 'Failed to create account')
        return
      }

      toast.success('Account created successfully!')
      router.push('/auth/login')
    } catch (error) {
      console.error('Signup error:', error)
      toast.error('Failed to create account. Please try again.')
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
            Create your account
          </h2>
          <p className="auth-subtitle">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary-green hover:text-primary-green-dark">
              Sign in
            </Link>
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-4">
            <div className="auth-input-group">
              <label htmlFor="fullName" className="label">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                {...register('fullName')}
                className="auth-input"
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="form-error">{errors.fullName.message}</p>
              )}
            </div>

            <div className="auth-input-group">
              <label htmlFor="identifier" className="label">
                Email or Phone Number
              </label>
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={handleIdentifierChange}
                className="auth-input"
                placeholder="Enter email or phone number"
                maxLength={50}
                autoComplete="email tel"
              />
              {error && <p className="form-error mt-2">{error}</p>}
            </div>

            <div className="auth-input-group">
              <label htmlFor="password" className="label">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register('password')}
                  className="auth-input"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                >
                  {!showPassword ? (
                    <EyeOff className="h-5 w-5" aria-label="Show password" />
                  ) : (
                    <Eye className="h-5 w-5" aria-label="Hide password" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="form-error">{errors.password.message}</p>
              )}
            </div>

            <div className="auth-input-group">
              <label htmlFor="confirmPassword" className="label">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register('confirmPassword')}
                  className="auth-input"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                >
                  {!showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" aria-label="Show password" />
                  ) : (
                    <Eye className="h-5 w-5" aria-label="Hide password" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="form-error">{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting || loading || !identifier || !watch('fullName') || !watch('password') || !watch('confirmPassword')}
              className={`auth-submit-button ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {(isSubmitting || loading) ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}