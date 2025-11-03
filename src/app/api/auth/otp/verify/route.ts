import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { phone, otp } = await request.json()
    if (!phone || !otp) {
      return NextResponse.json({ success: false, error: 'missing_params' }, { status: 400 })
    }

    const normalized = String(phone).replace(/\D/g, '')
    const submittedOtp = String(otp).replace(/\D/g, '')

    const cookieOtp = request.cookies.get('otp_code')?.value
    const cookiePhone = request.cookies.get('otp_phone')?.value

    if (!cookieOtp || !cookiePhone) {
      return NextResponse.json({ success: false, error: 'otp_not_found' }, { status: 400 })
    }

    const isMatch = cookieOtp === submittedOtp && cookiePhone === normalized

    const res = NextResponse.json({ success: isMatch })

    if (isMatch) {
      // Clear cookies on success
      res.cookies.set('otp_code', '', { path: '/', maxAge: 0 })
      res.cookies.set('otp_phone', '', { path: '/', maxAge: 0 })
    }

    return res
  } catch (e) {
    return NextResponse.json({ success: false, error: 'server_error' }, { status: 500 })
  }
}
