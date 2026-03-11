// api/suggest-authority.js
// This endpoint analyzes a complaint description and suggests the most relevant authority in India.

// Simple keyword-based authority suggestion (fast, reliable, no external API needed)
function suggestAuthorityByKeywords(text) {
  const lower = text.toLowerCase();

  // Banking & Finance
  if (lower.includes('bank') || lower.includes('account') || lower.includes('fraud') || 
      lower.includes('transaction') || lower.includes('upi') || lower.includes('credit card') || 
      lower.includes('debit card') || lower.includes('loan') || lower.includes('emi')) {
    return { 
      authority: 'RBI Ombudsman', 
      sector: 'banking', 
      description: 'Banking and financial services – RBI Integrated Ombudsman Scheme' 
    };
  }

  // Telecom
  if (lower.includes('airtel') || lower.includes('jio') || lower.includes('vi') || 
      lower.includes('vodafone') || lower.includes('network') || lower.includes('mobile') || 
      lower.includes('broadband') || lower.includes('sim') || lower.includes('call drop')) {
    return { 
      authority: 'TRAI / DoT', 
      sector: 'telecom', 
      description: 'Telecom Regulatory Authority of India / Department of Telecommunications' 
    };
  }

  // Aviation
  if (lower.includes('flight') || lower.includes('airline') || lower.includes('dgca') || 
      lower.includes('airport') || lower.includes('airasia') || lower.includes('indigo') || 
      lower.includes('spicejet') || lower.includes('cancellation') || lower.includes('baggage') ||
      lower.includes('delay') || lower.includes('refund')) {
    return { 
      authority: 'DGCA / AirSewa', 
      sector: 'airline', 
      description: 'Directorate General of Civil Aviation – AirSewa portal' 
    };
  }

  // E‑commerce / Consumer Goods
  if (lower.includes('amazon') || lower.includes('flipkart') || lower.includes('order') || 
      lower.includes('refund') || lower.includes('delivery') || lower.includes('return') || 
      lower.includes('product') || lower.includes('defective') || lower.includes('myntra') ||
      lower.includes('snapdeal') || lower.includes('not delivered')) {
    return { 
      authority: 'National Consumer Helpline (NCH)', 
      sector: 'ecommerce', 
      description: 'National Consumer Helpline – 1915 or consumerhelpline.gov.in' 
    };
  }

  // Insurance
  if (lower.includes('insurance') || lower.includes('claim') || lower.includes('policy') || 
      lower.includes('lic') || lower.includes('irda') || lower.includes('bima') ||
      lower.includes('premium') || lower.includes('rejection')) {
    return { 
      authority: 'IRDAI (Bima Bharosa)', 
      sector: 'insurance', 
      description: 'Insurance Regulatory and Development Authority – Bima Bharosa portal' 
    };
  }

  // Real Estate
  if (lower.includes('builder') || lower.includes('rera') || lower.includes('possession') || 
      lower.includes('flat') || lower.includes('apartment') || lower.includes('property') ||
      lower.includes('developer') || lower.includes('delay') || lower.includes('registration')) {
    return { 
      authority: 'RERA', 
      sector: 'realestate', 
      description: 'Real Estate Regulatory Authority – state RERA' 
    };
  }

  // Food Safety
  if (lower.includes('food') || lower.includes('restaurant') || lower.includes('hotel') || 
      lower.includes('zomato') || lower.includes('swiggy') || lower.includes('adulteration') ||
      lower.includes('expiry') || lower.includes('hygiene') || lower.includes('poisoning')) {
    return { 
      authority: 'FSSAI', 
      sector: 'food', 
      description: 'Food Safety and Standards Authority of India' 
    };
  }

  // Default fallback
  return { 
    authority: 'National Consumer Helpline', 
    sector: 'general', 
    description: 'General consumer issues – National Consumer Helpline 1915' 
  };
}

// Optional: if you want to use a real AI model (Hugging Face), uncomment and configure below.
// const HUGGINGFACE_API_KEY = process.env.HF_API_KEY; // set in Vercel env vars
// async function suggestWithAI(text) {
//   const response = await fetch(
//     "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
//     {
//       headers: { Authorization: `Bearer ${HUGGINGFACE_API_KEY}` },
//       method: "POST",
//       body: JSON.stringify({
//         inputs: text,
//         parameters: { candidate_labels: ["banking", "telecom", "airline", "ecommerce", "insurance", "realestate", "food", "general"] }
//       }),
//     }
//   );
//   const result = await response.json();
//   // map the label to authority data...
//   return mappedResult;
// }

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { description } = req.body;
  if (!description || description.trim().length < 10) {
    return res.status(400).json({ error: 'Description too short' });
  }

  try {
    // Use keyword-based suggestion (fast, no external dependency)
    const suggestion = suggestAuthorityByKeywords(description);

    // If you prefer AI, you could call suggestWithAI(description) and merge.
    // For now, we return the keyword-based suggestion.

    return res.status(200).json(suggestion);
  } catch (error) {
    console.error('Error in suggest-authority:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}