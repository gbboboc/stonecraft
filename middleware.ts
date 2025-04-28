import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: Request) {
  const token = await getToken({ req: request });
  const { pathname } = new URL(request.url);

  // Check token expiration
  const isExpired = token?.exp ? token.exp * 1000 < Date.now() : true;

  // Specifically handle /admin/login
  if (pathname === "/admin/login") {
    if (token && !isExpired) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // All other /admin routes require authentication
  if (pathname.startsWith("/admin")) {
    if (!token || isExpired) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/((?!login).*)", "/admin/sculptures/:path*", "/admin/images/:path*", "/admin/settings/:path*"]
}; 