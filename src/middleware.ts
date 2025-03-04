import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('token')?.value || '';

  const isAuthPage = path === '/login' || path === '/signup' || path === '/verifyemail';
  const isProtectedPage = path === '/profile'; // Add more protected routes here

  // If user is authenticated and trying to access auth pages, redirect to home
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  // If user is not authenticated and trying to access protected pages, redirect to landing page
  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/signup', '/verifyemail', '/profile'],
};

