"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function AdminPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to admin login
    router.push("/admin/login")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Loader2 className="w-8 h-8 animate-spin text-primary-green" />
    </div>
  )
}
