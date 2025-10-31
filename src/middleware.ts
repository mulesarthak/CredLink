import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Public paths that don't require authentication
  const publicPaths = [
    '/',
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
  const isPricingPath = path === '/pricing' || path.startsWith('/pricing/')
  const isCombinedPublicPath = publicPaths.includes(path) || isAuthPath || isAdminPath || isPricingPath

  // Check if user is authenticated (NextAuth uses next-auth.session-token)
  const isAuthenticated = request.cookies.has('next-auth.session-token') || 
                          request.cookies.has('__Secure-next-auth.session-token')

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && (isAuthPath)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Redirect unauthenticated users to login page (except for public paths)
  if (!isAuthenticated && !isCombinedPublicPath) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

// Configure the paths that should be protected
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*?)'],
}