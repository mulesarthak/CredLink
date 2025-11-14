import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, fullName, phone } = body
        console.log(email,password,fullName,phone);
    // Validate required fields
    if (!email || !password || !fullName || !phone) {
      return NextResponse.json(
        { error: 'Email, password, full name and phone number are required' },
        { status: 400 }
      )
    }

    // Normalize email to lowercase for consistency
    const normalizedEmail = email.toLowerCase().trim()

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      select: { id: true, email: true, status: true }
    })

    // If user exists and is active, reject signup
    if (existingUser && existingUser.status === 'active') {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      )
    }
    
    // If user exists but is inactive, reactivate the account
    if (existingUser && existingUser.status !== 'active') {
      const hashedPassword = await bcrypt.hash(password, 10)
      
      // Generate username from normalized email
      const baseUsername = normalizedEmail.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
      let username = baseUsername
      let counter = 1
      
      // Ensure username is unique (check against all users, not just active)
      while (await prisma.user.findUnique({ where: { username } })) {
        username = `${baseUsername}${counter}`
        counter++
      }

      // Reactivate the account with new password and details
      const reactivatedUser = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          password: hashedPassword,
          fullName,
          phone,
          username,
          status: 'active' // Reactivate the account
        },
        select: {
          id: true,
          email: true,
          fullName: true,
          phone: true,
          createdAt: true,
        },
      })

      return NextResponse.json(
        { 
          message: 'Account reactivated successfully',
          user: reactivatedUser,
          reactivated: true
        },
        { status: 200 }
      )
    }

    // Generate username from normalized email
    const baseUsername = normalizedEmail.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
    let username = baseUsername
    let counter = 1
    
    // Ensure username is unique
    while (await prisma.user.findUnique({ where: { username } })) {
      username = `${baseUsername}${counter}`
      counter++
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        fullName,
        phone,
        username,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        createdAt: true,
      },
    })

    // Send OTP to phone
    // const otpResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/otp/send`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ phone })
    // })

    // if (!otpResponse.ok) {
    //   console.error('Failed to send OTP:', await otpResponse.text())
    // }

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
