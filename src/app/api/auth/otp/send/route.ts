import { NextResponse } from 'next/server'

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function POST(request: Request) {
  try {
    const { phone } = await request.json()
    if (!phone || typeof phone !== 'string') {
      return NextResponse.json({ success: false, error: 'phone_required' }, { status: 400 })
    }

    const normalized = phone.replace(/\D/g, '')
    if (normalized.length < 10) {
      return NextResponse.json({ success: false, error: 'invalid_phone' }, { status: 400 })
    }

    const otp = generateOtp()
    // Send OTP via Twilio if configured
    const sid = process.env.TWILIO_ACCOUNT_SID
    const auth = process.env.TWILIO_AUTH_TOKEN
    const from = process.env.TWILIO_FROM // e.g. +1XXXXXXXXXX (must be a verified Twilio number)

    let e164To = ''
    if (phone.startsWith('+')) {
      e164To = phone
    } else if (normalized.length === 10) {
      // Default to +91 for 10-digit local numbers
      e164To = `+91${normalized}`
    } else {
      // Fallback: try to prepend '+' if user passed country code without '+'
      e164To = `+${normalized}`
    }

    if (sid && auth && from) {
      try {
        const body = new URLSearchParams({
          To: e164To,
          From: from,
          Body: `Your CredLink verification code is ${otp}`,
        })
        const twilioRes = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + Buffer.from(`${sid}:${auth}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body,
        })
        if (!twilioRes.ok) {
          const err = await twilioRes.text()
          return NextResponse.json({ success: false, error: 'sms_failed', details: err }, { status: 502 })
        }
      } catch (err) {
        return NextResponse.json({ success: false, error: 'sms_error' }, { status: 502 })
      }
    } else {
      console.warn('Twilio not configured; skipping SMS send and continuing in demo mode.')
    }

    const res = NextResponse.json({ success: true })

    // Store OTP and phone in httpOnly cookies for quick demo purposes only.
    // In production, store server-side (DB/redis) and map to a token.
    const maxAge = 60 * 10 // 10 minutes
    res.cookies.set('otp_code', otp, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge,
    })
    res.cookies.set('otp_phone', normalized, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge,
    })

    return res
  } catch (e) {
    return NextResponse.json({ success: false, error: 'server_error' }, { status: 500 })
  }
}

