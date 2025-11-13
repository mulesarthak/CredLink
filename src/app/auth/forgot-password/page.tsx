"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import "../../globals.css"

type Step = "phone" | "otp" | "reset"

export default function ForgotPasswordPage() {
  const router = useRouter()

  const [step, setStep] = useState<Step>("phone")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [passwordMismatch, setPasswordMismatch] = useState(false)

  // Phone
  const [phone, setPhone] = useState("")

  // OTP
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]) 

  // Reset password
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setPasswordMismatch(false)

    if (step === "phone") {
      const normalized = phone.replace(/\D/g, "")
      if (!normalized || normalized.length !== 10) {
        setError("Please enter a valid 10-digit phone number")
        return
      }
      setLoading(true)
      // UI-only: move to OTP step
      setTimeout(() => {
        setLoading(false)
        setStep("otp")
      }, 300)
      return
    }

    if (step === "otp") {
      const otp = otpDigits.join("")
      if (!otp || otp.length < 6) {
        setError("Please enter the 6-digit code")
        return
      }
      setLoading(true)
      // UI-only: move to reset step
      setTimeout(() => {
        setLoading(false)
        setStep("reset")
      }, 300)
      return
    }

    if (step === "reset") {
      if (!password || password.length < 8) {
        setError("Password must be at least 8 characters")
        return
      }
      if (password !== confirm) {
        setPasswordMismatch(true)
        return
      }
      setLoading(true)
      // UI-only: pretend success and redirect to login
      setTimeout(() => {
        router.push("/auth/login")
      }, 300)
      return
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
            {step === "phone" && "Forgot your password?"}
            {step === "otp" && "Enter the OTP"}
            {step === "reset" && "Set a new password"}
          </h2>
          <p className="auth-subtitle">
            {step === "phone" && "Enter your phone number to receive an OTP."}
            {step === "otp" && (
              <>We sent a 6-digit code to {phone ? <span className="font-medium">+91 {phone}</span> : "your phone"}.</>
            )}
            {step === "reset" && (
              <>{phone ? <>For <span className="font-medium">+91 {phone}</span></> : "Enter your new password below."}</>
            )}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form space-y-6">
          {step === "phone" && (
            <div className="auth-input-group">
              <label htmlFor="phone" className="label">Phone Number</label>
              <div className="flex items-center gap-2">
                <span className="px-3 py-2 border-2 border-[var(--background-light-blue)] rounded-md bg-[var(--background-white)] text-sm text-gray-600 select-none">
                  +91
                </span>
                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="auth-input"
                  placeholder="Enter 10-digit phone number"
                  required
                />
              </div>
            </div>
          )}

          {step === "otp" && (
            <div className="auth-input-group">
              <label className="label">OTP Code</label>
              <div className="flex gap-2 sm:gap-3 justify-between">
                {otpDigits.map((d, i) => (
                  <input
                    key={i}
                    id={`fp-otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={d}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "").slice(0,1)
                      const next = [...otpDigits]
                      next[i] = val
                      setOtpDigits(next)
                      if (val && i < 5) {
                        const nextEl = document.getElementById(`fp-otp-${i+1}`) as HTMLInputElement | null
                        nextEl?.focus()
                      }
                    }}
                    onKeyDown={(e) => {
                      if ((e as React.KeyboardEvent<HTMLInputElement>).key === 'Backspace' && !otpDigits[i] && i > 0) {
                        const prevEl = document.getElementById(`fp-otp-${i-1}`) as HTMLInputElement | null
                        prevEl?.focus()
                      }
                    }}
                    onPaste={(e) => {
                      const pasted = e.clipboardData.getData('text').replace(/\D/g, "").slice(0,6)
                      if (pasted) {
                        e.preventDefault()
                        const next = [...otpDigits]
                        for (let k=0; k<6; k++) next[k] = pasted[k] || ''
                        setOtpDigits(next)
                        const lastIndex = Math.min(5, pasted.length - 1)
                        const el = document.getElementById(`fp-otp-${Math.max(0,lastIndex)}`) as HTMLInputElement | null
                        el?.focus()
                      }
                    }}
                    className="w-12 h-12 sm:w-14 sm:h-12 text-center text-2xl sm:text-xl font-mono auth-input px-0"
                    style={{ padding: 0, lineHeight: '3rem' }}
                    required
                  />
                ))}
              </div>
              <div className="mt-2 text-right">
                <button type="button" className="text-sm text-primary-green hover:text-primary-green-dark" disabled={loading}>
                  Resend code
                </button>
              </div>
            </div>
          )}

          {step === "reset" && (
            <>
              <div className="auth-input-group">
                <label htmlFor="new-password" className="label">New Password</label>
                <input
                  id="new-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                  placeholder="Enter new password"
                  required
                />
              </div>

              <div className="auth-input-group">
                <label htmlFor="confirm-password" className="label">Confirm New Password</label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className={`auth-input ${passwordMismatch ? 'border-red-600' : ''}`}
                  placeholder="Re-enter new password"
                  required
                />
              </div>
              {passwordMismatch && <p className="mt-2 text-sm text-red-600">Passwords do not match</p>}
            </>
          )}

          {error && !passwordMismatch && <p className="mt-2 text-sm text-red-600">{error}</p>}

          <button type="submit" disabled={loading} className="auth-submit-button w-full">
            {step === "phone" && (loading ? "Continuing..." : "Send OTP")}
            {step === "otp" && (loading ? "Verifying..." : "Verify")}
            {step === "reset" && (loading ? "Saving..." : "Save and sign in")}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/auth/login" className="text-sm text-primary-green hover:text-primary-green-dark">
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  )
}
