"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ratelimit } from "@/lib/rate-limit";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(5);

  useEffect(() => {
    // Reset error message when component mounts
    setError("");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      // Check rate limit with error handling
      try {
        const { success, limit, reset, remaining } = await ratelimit.limit(
          email
        );

        if (!success) {
          setError(
            `Too many attempts. Please try again in ${Math.ceil(
              (reset - Date.now()) / 1000
            )} seconds.`
          );
          setRemainingAttempts(remaining);
          return;
        }
      } catch (rateLimitError) {
        console.error("Rate limit error:", rateLimitError);
        // Continue with login if rate limiting fails
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        setRemainingAttempts((prev) => Math.max(0, prev - 1));
      } else {
        router.push("/admin");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Admin Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1"
              />
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600">
              <p>{error}</p>
              {remainingAttempts < 5 && (
                <p className="mt-1">Remaining attempts: {remainingAttempts}</p>
              )}
            </div>
          )}

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
