# Create the js folder if it doesn't exist
New-Item -ItemType Directory -Path js -Force

# Create the hybrid-logic.js file
@'
// js/hybrid-logic.js
// Decides whether to use static data or call DeepSeek API

class HybridLogic {
    constructor() {
        this.apiUsage = this.loadApiUsage();
        this.FREE_TIER_LIMIT = 5000000; // 5 million tokens
    }

    loadApiUsage() {
        try {
            const usage = localStorage.getItem('deepseek_api_usage');
            return usage ? JSON.parse(usage) : { tokens: 0, lastReset: Date.now() };
        } catch {
            return { tokens: 0, lastReset: Date.now() };
        }
    }

    shouldUseAPI(query, type = 'general') {
        const q = query.toLowerCase();
        
        if (this.apiUsage.tokens >= this.FREE_TIER_LIMIT) {
            console.log('API limit reached, using static');
            return false;
        }

        const commonPatterns = [
            'flight delay', 'flight cancellation', 'airline refund',
            'bank fraud', 'upi fraud', 'unauthorized transaction',
            'amazon refund', 'flipkart refund', 'defective product',
            'builder delay', 'rera complaint', 'possession delay',
            'airtel network', 'jio network', 'call drops',
            'insurance claim', 'claim rejected', 'lpg delivery'
        ];

        for (const pattern of commonPatterns) {
            if (q.includes(pattern)) {
                return false;
            }
        }

        const complexIndicators = [
            'what if', 'how to', 'explain', 'difference',
            'complicated', 'specific', 'my situation', 'legal',
            'compensation', 'calculate', 'how much'
        ];

        for (const indicator of complexIndicators) {
            if (q.includes(indicator)) {
                return true;
            }
        }

        return q.split(' ').length > 6;
    }

    trackApiUsage(tokensUsed) {
        this.apiUsage.tokens += tokensUsed;
        localStorage.setItem('deepseek_api_usage', JSON.stringify(this.apiUsage));
    }

    async getResponse(query, type = 'general') {
        return {
            useAPI: this.shouldUseAPI(query, type),
            source: this.shouldUseAPI(query, type) ? 'api' : 'static'
        };
    }
}

export const hybridLogic = new HybridLogic();
'@ | Set-Content -Path js\hybrid-logic.js -Encoding UTF8

Write-Host "✅ Created js/hybrid-logic.js" -ForegroundColor Green