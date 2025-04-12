import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

interface RateLimitData {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitData>();

export const ratelimit = {
  limit: async (identifier: string) => {
    const now = Date.now();
    const windowSize = 10 * 1000; // 10 seconds in milliseconds
    const maxRequests = 5;

    const existingData = rateLimitStore.get(identifier);

    if (!existingData || now > existingData.resetTime) {
      // New window or expired window
      rateLimitStore.set(identifier, {
        count: 1,
        resetTime: now + windowSize,
      });
      return {
        success: true,
        limit: maxRequests,
        remaining: maxRequests - 1,
        reset: now + windowSize,
      };
    }

    if (existingData.count >= maxRequests) {
      return {
        success: false,
        limit: maxRequests,
        remaining: 0,
        reset: existingData.resetTime,
      };
    }

    // Increment count
    existingData.count++;
    rateLimitStore.set(identifier, existingData);

    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - existingData.count,
      reset: existingData.resetTime,
    };
  },
}; 