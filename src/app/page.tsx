"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/hooks/use-auth"
import { Header } from "@/components/layout/header"
import Homepage from "@/components/Homepage"
import Footer from "@/components/Footer"

export default function Home() {
  const router = useRouter()
  const { user, isAuthenticated, checkAuth, isLoading } = useAuth()

  useEffect(() => {
    // Only check auth once on mount
    let mounted = true
    if (mounted) {
      checkAuth()
    }
    return () => {
      mounted = false
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Redirect to dashboard if user is authenticated
    if (isAuthenticated && user) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, user, router])

  // Show loading state while checking auth or redirecting
  if (isLoading || (isAuthenticated && user)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-sm text-zinc-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Homepage />
      <Footer />
    </div>
  )
}
