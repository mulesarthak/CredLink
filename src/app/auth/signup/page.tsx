"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { toast } from "react-hot-toast"
import "../../globals.css"

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [captchaCode, setCaptchaCode] = useState('')
  const [generatedCaptcha, setGeneratedCaptcha] = useState('')
  const [acceptPrivacyPolicy, setAcceptPrivacyPolicy] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const recaptchaRef = useRef<RecaptchaVerifier | null>(null)

  // Generate random captcha code
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setGeneratedCaptcha(result)
    setCaptchaCode('')
  }

  // Generate captcha on component mount
  useEffect(() => {
    generateCaptcha()
    
    // Cleanup recaptcha on unmount
    return () => {
      try {
        recaptchaRef.current?.clear()
      } catch {}
      recaptchaRef.current = null
    }
  }, [])
  
  // Setup ReCaptcha for Firebase OTP
  const setupRecaptcha = () => {
    if (recaptchaRef.current) return recaptchaRef.current
    
    const container = typeof document !== 'undefined' ? document.getElementById('recaptcha-container') : null
    if (!container) throw new Error('reCAPTCHA container missing')
    
    recaptchaRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => console.log('reCAPTCHA solved!')
    })
    
    return recaptchaRef.current
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      setError('Please fill in all required fields')
      return
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (captchaCode !== generatedCaptcha) {
      setError('Invalid captcha code. Please try again.')
      generateCaptcha()
      return
    }

    if (!acceptPrivacyPolicy) {
      setError('Please accept the privacy policy to continue')
      return
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long')
      return
    }
    
    setLoading(true)
    
    try {
      // Store signup data in sessionStorage for after OTP verification
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('signupData', JSON.stringify({
          fullName,
          email,
          phone,
          password
        }))
      }
      
      // Setup reCAPTCHA and send OTP via Firebase
      const appVerifier = setupRecaptcha()
      const formattedPhone = phone.startsWith('+') ? phone : `+91${phone}`
      
      console.log('📱 Sending OTP to:', formattedPhone)
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier)
      
      // Store confirmation result in sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('verificationId', confirmation.verificationId)
        sessionStorage.setItem('otpPhone', formattedPhone)
      }
      
      toast.success('OTP sent successfully!')
      
      // Redirect to OTP verification page
      router.push(`/auth/verify-otp?phone=${encodeURIComponent(formattedPhone)}`)
      
    } catch (error: any) {
      console.error('Signup error:', error)
      setError(error.message || 'Failed to send OTP. Please try again.')
      toast.error(error.message || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Link href="/" className="block">
            <h1 className="auth-logo">MyKard</h1>
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

        {/* Hidden reCAPTCHA container for Firebase */}
        <div id="recaptcha-container" className="hidden" />


        <form
          className="auth-form"
          onSubmit={handleSignup}
        >
          <div className="space-y-4">
            <div className="auth-input-group">
              <label htmlFor="fullName" className="label">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="auth-input"
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="auth-input-group">
              <label htmlFor="phone" className="label">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="auth-input"
                placeholder="Enter phone number"
                required
              />
            </div>

            <div className="auth-input-group">
              <label htmlFor="email" className="label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="auth-input-group">
              <label htmlFor="password" className="label">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  style={{ paddingRight: '10px' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="auth-input-group">
              <label htmlFor="confirmPassword" className="label">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="auth-input"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  style={{ paddingRight: '10px' }}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Captcha Section */}
            <div className="auth-input-group">
              <label htmlFor="captcha" className="label">
                Captcha Code
              </label>
              <div className="flex gap-3 items-center">
                <div className="flex-1">
                  <input
                    id="captcha"
                    type="text"
                    value={captchaCode}
                    onChange={(e) => setCaptchaCode(e.target.value)}
                    className="auth-input"
                    placeholder="Enter captcha code"
                    required
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg font-mono text-lg font-bold text-gray-700 select-none"
                    style={{ letterSpacing: '3px', minWidth: '120px', textAlign: 'center' }}
                  >
                    {generatedCaptcha}
                  </div>
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    title="Refresh captcha"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="auth-input-group">
              <div className="flex items-start gap-3">
                <input
                  id="privacyPolicy"
                  type="checkbox"
                  checked={acceptPrivacyPolicy}
                  onChange={(e) => setAcceptPrivacyPolicy(e.target.checked)}
                  className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  required
                />
                <label htmlFor="privacyPolicy" className="text-sm text-gray-700">
                  I agree to the{' '}
                  <Link href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">
                    Privacy Policy
                  </Link>{' '}
                  and{' '}
                  <Link href="/terms-of-service" className="text-blue-600 hover:text-blue-800 underline">
                    Terms of Service
                  </Link>
                </label>
              </div>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={loading}
              className={`auth-submit-button w-full ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}