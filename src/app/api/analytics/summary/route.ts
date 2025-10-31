import { NextResponse } from "next/server"

// Dummy summary data for demonstration
const summary = {
  totalEvents: 1234,
  activeUsers: 56,
  pageViews: 7890,
  conversions: 12,
  lastUpdated: "2024-06-01T12:00:00Z"
}

export async function GET() {
  return NextResponse.json(summary)
}