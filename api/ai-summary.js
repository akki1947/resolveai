// Simple keyword-based summary generator (can be replaced with GPT later)
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { text, type } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Missing text' });
    }

    // Generate summary based on type
    let summary = '';
    let keyPoints = [];
    let suggestedAction = '';

    if (type === 'complaint') {
        // Extract key information
        const words = text.split(' ');
        summary = words.slice(0, 30).join(' ') + (words.length > 30 ? '...' : '');
        
        // Identify key points
        if (text.toLowerCase().includes('refund')) {
            keyPoints.push('Refund request identified');
        }
        if (text.toLowerCase().includes('delivery')) {
            keyPoints.push('Delivery issue identified');
        }
        if (text.toLowerCase().includes('damaged') || text.toLowerCase().includes('defective')) {
            keyPoints.push('Product quality issue identified');
        }
        
        suggestedAction = 'File a formal complaint with supporting evidence';
    }

    return res.status(200).json({
        summary,
        keyPoints,
        suggestedAction,
        wordCount: text.split(' ').length,
        sentiment: 'neutral' // Placeholder for sentiment analysis
    });
}