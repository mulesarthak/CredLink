import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Decode JWT payload (without verification)
function decodeJwtPayload(token: string): any | null {
  try {
    const base64Url = token.split('.')[1]
    if (!base64Url) return null
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=')
    const json = atob(padded)
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isApiRequest = path.startsWith('/api')

  const publicPaths = [
    '/',
    '/auth/login',
    '/auth/signup',
    '/auth/verify-otp',
    '/features',
    '/how-it-works',
    '/pricing',
    '/contact',
    '/support',
    '/dashboard/edit',
    '/search',
    '/faq',
    '/terms',
    '/privacy',
    '/create-card',
    '/cards/:path*',
    '/dashboard/messages',
    '/api/message/receive',
    '/api/message/send'
  ]
  
  const isAuthPath = path.startsWith('/auth')
  const isAdminPath = path.startsWith('/admin')
  const isDashboardPath = path.startsWith('/dashboard')
  const isPricingPath = path === '/pricing' || path.startsWith('/pricing/')
  const isContactPath = path === '/contact' || path.startsWith('/contact/')
  const isDashboardContactPath = path === '/dashboardcontact' || path.startsWith('/dashboardcontact/')

  const isCombinedPublicPath = publicPaths.some(publicPath => {
    if (publicPath.endsWith('*')) {
      return path.startsWith(publicPath.slice(0, -1))
    }
    return publicPath === path
  }) || isAuthPath || isAdminPath || isDashboardPath || isPricingPath || isContactPath || isDashboardContactPath

  const userToken = request.cookies.get('user_token')?.value
  const adminToken = request.cookies.get('admin_token')?.value
  const authHeader = request.headers.get('authorization') || request.headers.get('Authorization')
  const bearerToken = authHeader && authHeader.startsWith('Bearer ')
    ? authHeader.substring('Bearer '.length).trim()
    : undefined
  
  const isAuthenticated = request.cookies.has('user_token') || 
                          request.cookies.has('admin_token') ||
                          request.cookies.has('next-auth.session-token') || 
                          request.cookies.has('__Secure-next-auth.session-token')

  let userId: string | null = null
  let adminId: string | null = null
  
  if (userToken) {
    const decoded = decodeJwtPayload(userToken)
    if (decoded) {
      userId = decoded.userId || decoded.id || null
    }
  }

  if (adminToken) {
    const decoded = decodeJwtPayload(adminToken)
    if (decoded) {
      adminId = decoded.adminId || decoded.id || null
    }
  }

  if (!userId && bearerToken) {
    const decoded = decodeJwtPayload(bearerToken)
    if (decoded) {
      userId = decoded.userId || decoded.id || null
    }
  }

  // Redirect logic
  if (!isApiRequest) {
    if (!isAuthenticated && !isCombinedPublicPath) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    if (isAuthenticated && path.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Add user/admin IDs to headers
  const requestHeaders = new Headers(request.headers)
  if (userId !== null) {
    requestHeaders.set('x-user-id', userId)
  }
  if (adminId !== null) {
    requestHeaders.set('x-admin-id', adminId)
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: ['/api/:path*', '/((?!_next/static|_next/image|favicon.ico).*?)'],
}
