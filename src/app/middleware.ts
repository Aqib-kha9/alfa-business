import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  const url = req.nextUrl;

  if (url.pathname.startsWith('/admin/dashboard')) {
    if (!token) return NextResponse.redirect(new URL('/admin/login', req.url));

    try {
      verifyToken(token);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/dashboard/:path*'],
};
