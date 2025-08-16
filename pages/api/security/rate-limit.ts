import { NextApiRequest, NextApiResponse } from 'next';

// In-memory store for rate limiting (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  message: string; // Error message
}

const defaultConfig: RateLimitConfig = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // 100 requests per 15 minutes
  message: 'För många requests från denna IP. Försök igen senare.'
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, config } = req.body;
  
  if (action === 'check') {
    return checkRateLimit(req, res, config || defaultConfig);
  } else if (action === 'reset') {
    return resetRateLimit(req, res);
  } else {
    return res.status(400).json({ error: 'Invalid action' });
  }
}

function checkRateLimit(req: NextApiRequest, res: NextApiResponse, config: RateLimitConfig) {
  const clientIP = getClientIP(req);
  const now = Date.now();
  
  // Get current rate limit data for this IP
  const currentData = rateLimitStore.get(clientIP);
  
  if (!currentData || now > currentData.resetTime) {
    // First request or window expired, start new window
    rateLimitStore.set(clientIP, {
      count: 1,
      resetTime: now + config.windowMs
    });
    
    return res.status(200).json({
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: new Date(now + config.windowMs).toISOString(),
      limit: config.maxRequests
    });
  }
  
  if (currentData.count >= config.maxRequests) {
    // Rate limit exceeded
    return res.status(429).json({
      allowed: false,
      message: config.message,
      resetTime: new Date(currentData.resetTime).toISOString(),
      limit: config.maxRequests
    });
  }
  
  // Increment counter
  currentData.count++;
  rateLimitStore.set(clientIP, currentData);
  
  return res.status(200).json({
    allowed: true,
    remaining: config.maxRequests - currentData.count,
    resetTime: new Date(currentData.resetTime).toISOString(),
    limit: config.maxRequests
  });
}

function resetRateLimit(req: NextApiRequest, res: NextApiResponse) {
  const clientIP = getClientIP(req);
  
  if (rateLimitStore.has(clientIP)) {
    rateLimitStore.delete(clientIP);
  }
  
  return res.status(200).json({
    message: 'Rate limit reset successfully',
    ip: clientIP
  });
}

function getClientIP(req: NextApiRequest): string {
  // Get IP from various headers (for different hosting environments)
  const forwarded = req.headers['x-forwarded-for'];
  const realIP = req.headers['x-real-ip'];
  const connectionIP = req.connection?.remoteAddress;
  const socketIP = req.socket?.remoteAddress;
  
  if (forwarded) {
    return Array.isArray(forwarded) ? forwarded[0] : forwarded.split(',')[0];
  }
  
  if (realIP) {
    return Array.isArray(realIP) ? realIP[0] : realIP;
  }
  
  if (connectionIP) {
    return connectionIP;
  }
  
  if (socketIP) {
    return socketIP;
  }
  
  return 'unknown';
}

// Cleanup old entries periodically (in production, use a proper job scheduler)
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitStore.entries()) {
    if (now > data.resetTime) {
      rateLimitStore.delete(ip);
    }
  }
}, 60000); // Clean up every minute
