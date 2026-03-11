// api/negotiate.js
// Provides negotiation advice based on user query

function getNegotiationAdvice(query) {
  const lower = query.toLowerCase();

  // Flight delay / cancellation
  if (lower.includes('flight') || lower.includes('airline') || lower.includes('delay') || lower.includes('cancellation')) {
    if (lower.includes('delay') || lower.includes('late')) {
      return {
        compensation: 'Under DGCA rules, if a flight is delayed more than 2 hours, you are entitled to meals/refreshments. If delayed more than 6 hours, you can claim a full refund or alternative flight. For delays >24 hours, compensation up to ₹10,000 may apply.',
        legal: 'DGCA Civil Aviation Requirements Section 3, Series M, Part IV',
        nextSteps: '1. Contact airline for compensation. 2. If denied, file complaint on AirSewa portal. 3. Escalate to DGCA if unresolved.'
      };
    }
    if (lower.includes('cancellation')) {
      return {
        compensation: 'If airline cancels flight without prior notice, you are entitled to a full refund plus compensation (₹5,000-₹10,000 depending on delay of rebooking).',
        legal: 'DGCA rules on cancellation compensation',
        nextSteps: '1. Ask airline for compensation. 2. File on AirSewa. 3. Approach consumer court if needed.'
      };
    }
  }

  // Bank fraud / wrong deduction
  if (lower.includes('bank') || lower.includes('fraud') || lower.includes('deduction') || lower.includes('transaction')) {
    return {
      compensation: 'Under RBI rules, if fraud reported within 3 days, zero liability. After 3 days, limited liability up to ₹25,000. For wrong deductions, bank must reverse with interest.',
      legal: 'RBI Circular on Limiting Liability of Customers in Unauthorised Transactions (2017)',
      nextSteps: '1. Immediately report to bank and get SRN. 2. If not resolved in 30 days, file RBI Ombudsman complaint. 3. Also file cyber crime complaint at cybercrime.gov.in if fraud.'
    };
  }

  // E-commerce refund
  if (lower.includes('amazon') || lower.includes('flipkart') || lower.includes('refund') || lower.includes('return')) {
    return {
      compensation: 'Under Consumer Protection Act, you are entitled to full refund for defective/not delivered products. If delayed beyond 30 days, you can claim interest.',
      legal: 'Consumer Protection Act 2019, Section 2(9)',
      nextSteps: '1. Escalate to Grievance Officer. 2. File on National Consumer Helpline. 3. Approach consumer court via e-Daakhil.'
    };
  }

  // Builder delay
  if (lower.includes('builder') || lower.includes('rera') || lower.includes('possession') || lower.includes('delay')) {
    return {
      compensation: 'Under RERA, builder must pay interest for every month of delay (SBI MCLR + 2%). You can also withdraw and get full refund with interest.',
      legal: 'RERA Act 2016, Section 18',
      nextSteps: '1. Send legal notice. 2. File complaint with state RERA. 3. Alternatively, approach consumer court.'
    };
  }

  // Telecom
  if (lower.includes('airtel') || lower.includes('jio') || lower.includes('network') || lower.includes('mobile')) {
    return {
      compensation: 'For poor service, you can claim proportionate refund. For billing errors, full refund with interest. TRAI has specified quality standards.',
      legal: 'TRAI Standards of Quality of Service',
      nextSteps: '1. Complaint to provider. 2. Escalate to Nodal Officer. 3. File on TRAI portal.'
    };
  }

  // Insurance
  if (lower.includes('insurance') || lower.includes('claim') || lower.includes('policy')) {
    return {
      compensation: 'If claim wrongly rejected, you are entitled to the sum assured plus interest. Mis-selling entitles you to full refund of premiums.',
      legal: 'IRDAI Protection of Policyholders’ Interests Regulations',
      nextSteps: '1. File grievance with insurer. 2. Escalate to IRDAI Bima Bharosa. 3. Approach consumer court.'
    };
  }

  // Default
  return {
    compensation: 'Please provide more details about your issue. For example: flight delay, bank fraud, refund not received, builder delay, etc.',
    legal: 'Consumer Protection Act 2019',
    nextSteps: 'You can use our complaint search or AI Advisor for specific guidance.'
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.body;
  if (!query || query.trim().length < 5) {
    return res.status(400).json({ error: 'Please describe your issue in more detail.' });
  }

  try {
    const advice = getNegotiationAdvice(query);
    res.status(200).json(advice);
  } catch (error) {
    console.error('Negotiation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}