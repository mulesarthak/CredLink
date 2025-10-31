import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected, /login)
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
  
  const isPublicPath = publicPaths.includes(path)

  // Check if user is authenticated
  const isAuthenticated = request.cookies.has('authToken') // Replace with your auth token name

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && (path === '/auth/login' || path === '/auth/signup')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Redirect unauthenticated users to login page (only for protected routes)
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

// Configure the paths that should be protected
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}