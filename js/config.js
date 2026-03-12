// js/config.js
// Simplified configuration without Supabase
const CONFIG = {
    app: {
        name: 'ResolveAI',
        version: '2.0.0'
    },
    openai: {
        // Add your OpenAI API key here when you have one
        // For now, simulated responses will be used
        apiKey: null
    },
    rateLimit: {
        maxComplaints: 3,
        windowHours: 1
    }
};

export default CONFIG;