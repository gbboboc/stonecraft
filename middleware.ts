import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isExpired = token?.exp ? token.exp * 1000 < Date.now() : true;

    if (isExpired) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/((?!login).*)", "/admin/sculptures/:path*", "/admin/images/:path*", "/admin/settings/:path*"]
}; 