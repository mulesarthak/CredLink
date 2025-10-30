"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary-green" />
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="auth-card max-w-4xl mx-auto">
          <div className="auth-header">
            <h1 className="auth-logo">CredLink</h1>
            <h2 className="auth-title">Welcome to Your Dashboard</h2>
            <p className="auth-subtitle">
              You are successfully logged in!
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">User Information</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-secondary">Name</p>
                  <p className="font-medium">{session.user?.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary">Email</p>
                  <p className="font-medium">{session.user?.email || "N/A"}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => router.push("/")}
                variant="outline"
                className="flex-1"
              >
                Go to Home
              </Button>
              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex-1 bg-gradient-primary"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
