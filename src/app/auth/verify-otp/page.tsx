"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"

function VerifyOtpContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const phone = searchParams.get("phone") || ""

  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!otp || otp.length < 4) {
      setError("Please enter the OTP code")
      return
    }

    setLoading(true)
    try {
      // TODO: Call your real OTP verify API here
      // await fetch('/api/auth/otp/verify', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone, otp }) })
      await new Promise((r) => setTimeout(r, 600))
      toast.success("Phone verified successfully!")
      router.push("/auth/login")
    } catch {
      setError("Invalid or expired OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setLoading(true)
    try {
      // TODO: Call your real OTP send API here
      // await fetch('/api/auth/otp/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ phone }) })
      await new Promise((r) => setTimeout(r, 600))
      toast.success("OTP sent again")
    } catch {
      toast.error("Failed to resend OTP")
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
          <h2 className="auth-title">Verify your phone</h2>
          <p className="auth-subtitle">
            We sent a code to {phone ? <span className="font-medium">{phone}</span> : "your phone"}.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form space-y-6">
          <div className="auth-input-group">
            <label htmlFor="otp" className="label">OTP Code</label>
            <input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="auth-input"
              placeholder="Enter the 6-digit code"
              required
            />
          </div>

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full" suppressHydrationWarning>
            {loading ? "Verifying..." : "Verify"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleResend}
            className="text-sm text-primary-green hover:text-primary-green-dark"
            disabled={loading}
          >
            Resend code
          </button>
        </div>
      </div>
    </div>
  )
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  )
}
