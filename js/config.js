// Centralized configuration
const CONFIG = {
    supabase: {
        url: 'https://qdymteenojnjwgblxjas.supabase.co',
        anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeW10ZWVub2puandnYmx4amFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NTY5MTIsImV4cCI6MjA1NzIzMjkxMn0.9Yx8c8Pc8Pc8Pc8Pc8Pc8Pc8Pc8Pc8Pc8Pc8Pc8'
    },
    rateLimit: {
        maxComplaints: 3,
        windowHours: 1
    },
    evidence: {
        maxSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'application/pdf']
    },
    cache: {
        ttl: 3600 // 1 hour
    }
};

export default CONFIG;