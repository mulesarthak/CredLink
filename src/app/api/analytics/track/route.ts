import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const event = await request.json()
  // Here you would normally process and store the event
  return NextResponse.json({ success: true, received: event })
}