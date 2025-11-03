import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/jwt'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Public paths that don't require authentication
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
    '/create-card'
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
  
  // Check if user is authenticated (check for custom user_token or admin_token)
  const isAuthenticated = request.cookies.has('user_token') || 
                          request.cookies.has('admin_token') ||
                          request.cookies.has('next-auth.session-token') || 
                          request.cookies.has('__Secure-next-auth.session-token')

  // Extract user ID from JWT and add to request headers
  let userId: string | null = null
  let adminId: string | null = null
  
  if (userToken) {
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
  if (!isAuthenticated && !isCombinedPublicPath) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
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
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*?)'],
}