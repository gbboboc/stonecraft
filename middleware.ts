import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: Request) {
  const token = await getToken({ req: request });
  const isAdminPath = request.url.includes("/admin");
  const isLoginPath = request.url.includes("/admin/login");

  if (isAdminPath && !isLoginPath && !token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isLoginPath && token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
}; 