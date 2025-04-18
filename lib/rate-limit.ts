// Simple in-memory rate limiting
const ipRequests = new Map<string, { count: number; timestamp: number }>();

export function rateLimit(limit: number = 10, window: number = 60) {
  return async (ip: string) => {
    const now = Date.now();
    const windowStart = now - window * 1000;

    // Clean up old entries
    for (const [key, value] of ipRequests.entries()) {
      if (value.timestamp < windowStart) {
        ipRequests.delete(key);
      }
    }

    // Get or create request count for this IP
    const requestData = ipRequests.get(ip) || { count: 0, timestamp: now };
    
    // Reset count if outside window
    if (requestData.timestamp < windowStart) {
      requestData.count = 0;
      requestData.timestamp = now;
    }

    // Increment count
    requestData.count++;
    ipRequests.set(ip, requestData);

    // Check if over limit
    return requestData.count <= limit;
  };
} 