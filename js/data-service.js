// Centralized data fetching with caching
class DataService {
    constructor() {
        this.cache = new Map();
        this.baseUrl = '/data';
    }

    async fetchJson(filename, ttl = 3600) {
        const cacheKey = filename;
        const cached = this.cache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < ttl * 1000) {
            return cached.data;
        }
        
        try {
            const response = await fetch(`${this.baseUrl}/${filename}`);
            const data = await response.json();
            
            this.cache.set(cacheKey, {
                data,
                timestamp: Date.now()
            });
            
            return data;
        } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            throw error;
        }
    }

    async getComplaintCategories() {
        return this.fetchJson('grievance-categories.json');
    }

    async getCompanies() {
        return this.fetchJson('companies.json');
    }

    async getEmergencyContacts() {
        return this.fetchJson('emergencyData.json');
    }

    clearCache() {
        this.cache.clear();
    }
}

export const dataService = new DataService();