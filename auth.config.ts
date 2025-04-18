import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

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
  providers: [
    Credentials({
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
          return {
            id: "1",
            email: process.env.ADMIN_EMAIL,
            name: "Admin",
          };
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig; 