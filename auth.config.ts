import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/admin");
      const isOnLoginPage = nextUrl.pathname === "/admin/login";

      // Allow access to login page
      if (isOnLoginPage) {
        return true;
      }

      // For all other admin pages, require authentication
      if (isOnDashboard) {
        return isLoggedIn;
      }

      // For non-admin pages, redirect to admin if logged in
      if (isLoggedIn) {
        return Response.redirect(new URL("/admin", nextUrl));
      }

      return true;
    },
  },
  providers: [], // we will add providers later
} satisfies NextAuthConfig; 