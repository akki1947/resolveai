// Simple in-memory rate limiting
const rateLimit = new Map();

export function checkRateLimit(ip, limit = 5, windowMs = 3600000) {
    const now = Date.now();
    const key = ip;
    
    if (!rateLimit.has(key)) {
        rateLimit.set(key, []);
    }
    
    const timestamps = rateLimit.get(key).filter(t => now - t < windowMs);
    timestamps.push(now);
    rateLimit.set(key, timestamps);
    
    return timestamps.length <= limit;
}

export function getRemainingRequests(ip, limit = 5, windowMs = 3600000) {
    const now = Date.now();
    const timestamps = rateLimit.get(ip) || [];
    const validTimestamps = timestamps.filter(t => now - t < windowMs);
    return Math.max(0, limit - validTimestamps.length);
}