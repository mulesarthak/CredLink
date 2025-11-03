"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if admin is authenticated, otherwise redirect to login
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/auth/me')
        if (response.ok) {
          router.push("/admin/dashboard")
        } else {
          router.push("/admin/login")
        }
      } catch (error) {
        router.push("/admin/login")
      }
    }
    checkAuth()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="w-8 h-8 animate-spin text-primary-green" />
    </div>
  )
}
