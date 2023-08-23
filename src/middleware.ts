import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { authRoutes, protectedRoutes } from "./router/routes";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  /* if (isProtectedRoute) {
        // Redirect to login if not authenticated
        if (!req.locals.user) {
        return NextResponse.redirect('/login');
        }
    }
    
    if (isAuthRoute) {
        // Redirect to dashboard if authenticated
        if (req.locals.user) {
        return NextResponse.redirect('/dashboard');
        }
    } */

  const currentUser = req.cookies.get("currentUser")?.value;

  if (
    isProtectedRoute &&
    (!currentUser || Date.now() > JSON.parse(currentUser).expiresAt)
  ) {
    req.cookies.delete("currentUser");
    const response = NextResponse.redirect(
      new URL("/login", req.nextUrl.origin).href
    );
    response.cookies.delete;
    return response;
  }
  if (
    isAuthRoute &&
    currentUser &&
    Date.now() < JSON.parse(currentUser).expiresAt
  ) {
    return NextResponse.redirect(
      new URL("/account/dashboard", req.nextUrl.origin).href
    );
  }
  return NextResponse.next();
}
