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

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        if (isOnLoginPage) return true;
        return false;
      }
      return true;
    },
  },
  providers: [], // we will add providers later
} satisfies NextAuthConfig; 