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
//import { signInWithPhoneNumber } from "@/lib/firebase"
//import { auth } from "@/lib/firebase"
//import { RecaptchaVerifier, type ConfirmationResult } from "firebase/auth"

// Augment window for reCAPTCHA handle (must be top-level)
// declare global {
//   interface Window {
//     recaptchaVerifier?: RecaptchaVerifier
//   }
// }

type SignupForm = z.infer<typeof signupSchema>

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [identifier, setIdentifier] = useState('')
  const [identifierType, setIdentifierType] = useState<'email' | 'phone' | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [otp, setOtp] = useState('')
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
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
    
    // Update form values based on detected type
    if (type === 'email') {
      setValue('email', value)
      setValue('phone', '')
    } else if (type === 'phone') {
      setValue('phone', value)
      setValue('email', '')
    }
  }
/*
  const sendOtp = async () => {
    try {
      const verifier = setupRecaptcha()
      const phoneNumber = "+91" + identifier
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier)
      // Persist verificationId for the verify page
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('verificationId', confirmationResult.verificationId)
        sessionStorage.setItem('otpPhone', phoneNumber)
      }
      toast.success('OTP sent!')
      router.push(`/auth/verify-otp?phone=${encodeURIComponent(identifier)}`)
    } catch (error: any) {
      console.error(error)
      toast.error(error?.message || 'Failed to send OTP')
    }
  }

  // OTP verification happens on /auth/verify-otp page using verificationId
  
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      })
    }
    return window.recaptchaVerifier
  }
*/
  const onSubmit = async (data: SignupForm) => {
    if (identifierType === 'phone') {
      //await sendOtp()
      return
    }
    
    // For email signup, continue as before
    try {
      const loadingToast = toast.loading('Creating your account...')
      
      // Send register payload to backend JSON API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          fullName: data.fullName,
          phone: data.phone
        }),
      })

     /* const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          fullName: data.fullName,
          phone: data.phone
        }),
      })
*/
      const result = await response.json()
      toast.dismiss(loadingToast)

      if (!response.ok) {
        toast.error(result.error || 'Failed to create account')
        setError(result.error || 'Failed to create account')
        return
      }

      // Show success message and redirect
      toast.success('🎉 Account created successfully! Redirecting to login...', {
        duration: 3000,
      })
      
      // Wait a moment before redirecting so user sees the message
      setTimeout(() => {
        router.push('/auth/login')
      }, 1500)
    } catch (error) {
      console.error('Signup error:', error)
      toast.error('Failed to create account. Please try again.')
      setError('Failed to create account. Please try again.')
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

        {/* Invisible reCAPTCHA container for Firebase phone auth */}
        <div id="recaptcha-container" className="hidden" />

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
                 Phone Number
              </label>
              <input
                id="identifier"
                type="number"
                {...register('phone')}
                //onChange={handleIdentifierChange}
                className="auth-input"
                placeholder="Enter phone number"
                maxLength={50}
                //autoComplete="email tel"
                required
              />
              {identifierType && (
                <p className="text-xs text-gray-500 mt-1">
                  {identifierType === 'email' ? '✓ Valid email' : '✓ Valid phone number'}
                </p>
              )}
              {error && <p className="form-error mt-2">{error}</p>}
              {errors.email && <p className="form-error mt-2">{errors.email.message}</p>}
            </div>

            <div className="auth-input-group">
              <label htmlFor="identifier" className="label">
                Email 
              </label>
              <input
                id="identifier"
                type="email"
                {...register('email')}
                //onChange={handleIdentifierChange}
                className="auth-input"
                placeholder="Enter email"
                maxLength={50}
                autoComplete="email tel"
                required
              />
              {identifierType && (
                <p className="text-xs text-gray-500 mt-1">
                  {identifierType === 'email' ? '✓ Valid email' : '✓ Valid phone number'}
                </p>
              )}
              {error && <p className="form-error mt-2">{error}</p>}
              {errors.email && <p className="form-error mt-2">{errors.email.message}</p>}
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
              disabled={isSubmitting || loading}
              className={`auth-submit-button ${(isSubmitting || loading) ? 'opacity-60 cursor-not-allowed' : ''}`}
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