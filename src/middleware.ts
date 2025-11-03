import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// NOTE: Middleware runs on the Edge runtime. Avoid Node-only libraries here (like jsonwebtoken).
// We'll decode JWT payloads locally (without verification) just to forward IDs via headers.
// API route handlers must still VERIFY tokens server-side for real auth decisions.
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
import { verifyToken } from '@/lib/jwt'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isApiRequest = path.startsWith('/api')

  // Public paths that don't require authentication
  // Add any routes here that should be accessible without logging in (e.g. /pricing)
  const isPublicPath =
    path === '/auth/login' ||
    path === '/auth/signup' ||
    path === '/pricing' ||
    path.startsWith('/pricing/') ||
    path === '/profile'

  // Check if user is authenticated
  const isAuthenticated = request.cookies.has('authToken') // Replace with your auth token name

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && isPublicPath) {
    return NextResponse.redirect(new URL('/', request.url))
  const publicPaths = [
    '/',
    '/dashboard',
    '/auth/login',
    '/auth/signup',
    '/features',
    '/how-it-works',
    '/pricing',
    '/contact',
    '/search',
    '/faq',
    '/terms',
    '/privacy',
    '/create-card',
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
  
  // Check if the current path is in the public paths array or matches public path patterns
  const isInPublicPaths = publicPaths.includes(path)
  const isCombinedPublicPath = isInPublicPaths || isAuthPath || isAdminPath || isDashboardPath || isPricingPath || isContactPath || isDashboardContactPath

  // Get tokens from cookies
  const userToken = request.cookies.get('user_token')?.value
  const adminToken = request.cookies.get('admin_token')?.value
  const authHeader = request.headers.get('authorization') || request.headers.get('Authorization')
  const bearerToken = authHeader?.startsWith('Bearer ')
    ? authHeader.substring('Bearer '.length).trim()
    : undefined
  
  // Check if user is authenticated (check for custom user_token or admin_token)
  const isAuthenticated = request.cookies.has('user_token') || 
                          request.cookies.has('admin_token') ||
                          request.cookies.has('next-auth.session-token') || 
                          request.cookies.has('__Secure-next-auth.session-token')

  // Extract user ID from JWT and add to request headers
  let userId: string | null = null
  let adminId: string | null = null
  
  if (userToken) {
    const decoded = decodeJwtPayload(userToken)
    if (decoded) {
      userId = decoded.userId || decoded.id || null
    try {
      const decoded = verifyToken(userToken) as any
      if (decoded) {
        userId = decoded.userId ?? null
      }
    } catch (error) {
      // Invalid token, ignore
    }
  }

  if (adminToken) {
    const decoded = decodeJwtPayload(adminToken)
    if (decoded) {
      adminId = decoded.adminId || decoded.id || null
    }
  }

  // If Authorization: Bearer <token> is provided, prefer it for user ID extraction
  if (!userId && bearerToken) {
    const decoded = decodeJwtPayload(bearerToken)
    if (decoded) {
      userId = decoded.userId || decoded.id || null
    try {
      const decoded = verifyToken(adminToken) as any
      if (decoded) {
        adminId = decoded.adminId ?? null
      }
    } catch (error) {
      // Invalid token, ignore
    }
  }

  // Allow authenticated users to access auth pages (for logout/account switching)
  // if (isAuthenticated && isAuthPath) {
  //   return NextResponse.redirect(new URL('/dashboard', request.url))
  // }

  // Redirect unauthenticated users to login page (except for public paths)
  // For API requests, do not redirect; just pass through with enriched headers.
  if (!isApiRequest) {
    if (!isAuthenticated && !isCombinedPublicPath) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  // Clone the request headers and add user/admin ID
  const requestHeaders = new Headers(request.headers)
  if (userId) {
    requestHeaders.set('x-user-id', userId)
  }
  if (adminId) {
    requestHeaders.set('x-admin-id', adminId)
  }

  // Return response with modified headers
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

// Configure the paths that should be protected
export const config = {
  // Include API so we can enrich requests (e.g., forward x-user-id) while still skipping redirects for API.
  matcher: ['/api/:path*', '/((?!_next/static|_next/image|favicon.ico).*?)'],
}