import { NextResponse } from "next/server"

// Dummy data for demonstration
const profiles = [
  {
    username: "john",
    name: "John Doe",
    email: "john@example.com",
    city: "New York",
    company: "Tech Corp",
    designation: "Full Stack Developer",
    category: "Technology",
    status: "published",
    views: 1250,
    joined: "2024-01-15"
  },
  {
    username: "jane",
    name: "Jane Smith",
    email: "jane@example.com",
    city: "Los Angeles",
    company: "Marketing Pro",
    designation: "Digital Marketing Expert",
    category: "Marketing",
    status: "draft",
    views: 890,
    joined: "2024-01-18"
  }
]

export async function GET(request: Request, { params }: { params: Promise<{ username: string }> }) {
  const { username } = await params
  const profile = profiles.find(p => p.username === username)
  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 })
  }
  return NextResponse.json(profile)
}