# Create api folder if it doesn't exist
New-Item -ItemType Directory -Path api -Force

# Create deepseek.js
@'
// api/deepseek.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { query, type } = req.body;

    if (!query) {
        return res.status(400).json({ error: 'Missing query' });
    }

    try {
        const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a consumer rights expert in India. Provide helpful, accurate advice based on Indian consumer laws (Consumer Protection Act 2019, RBI guidelines, TRAI regulations, DGCA rules, RERA Act). Give structured responses with bullet points.'
                    },
                    {
                        role: 'user',
                        content: query
                    }
                ],
                temperature: 0.3,
                max_tokens: 500
            })
        });

        const data = await response.json();
        const tokensUsed = data.usage?.total_tokens || 100;
        
        res.status(200).json({
            advice: data.choices[0].message.content,
            tokens: tokensUsed
        });

    } catch (error) {
        console.error('DeepSeek API error:', error);
        res.status(500).json({ 
            error: 'Failed to get AI response',
            advice: 'I apologize, but I encountered an error. Please try again later.'
        });
    }
}
'@ | Set-Content -Path api\deepseek.js -Encoding UTF8

Write-Host "✅ Created api/deepseek.js" -ForegroundColor Green