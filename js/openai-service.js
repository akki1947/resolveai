// js/openai-service.js
// OpenAI service for consumer complaints

class OpenAIService {
    constructor() {
        this.apiKey = null;
        this.useSimulated = true;
    }

    setApiKey(key) {
        this.apiKey = key;
        this.useSimulated = false;
    }

    async getAdvice(query, type = 'general') {
        if (this.useSimulated) {
            return this.getSimulatedResponse(query, type);
        }
        return this.getSimulatedResponse(query, type);
    }

    
    getSimulatedResponse(query, type) {
        const q = query.toLowerCase();
        
        // Real Estate / Builder complaints (check first to avoid misrouting)
        if (q.includes('builder') || q.includes('rera') || q.includes('possession') || q.includes('flat') || q.includes('apartment') || q.includes('property')) {
            return {
                success: true,
                advice: `**🏗️ Real Estate / Builder Delay Advice**

Based on RERA Act 2016 and your query about ${query}:

**Your Legal Rights:**
• Builder must pay interest for every month of delay (same as your EMI rate)
• If delay >1 year: You can withdraw from project and get full refund + interest
• Builder cannot change project plans without buyer consent

**Interest Calculation:**
• Rate: SBI MCLR + 2% (approximately 10-11% annually)
• Interest payable from original possession date to actual possession
• For refund cases: Interest from each payment date until refund

**Action Plan:**
1. **Send Legal Notice:** Demand possession or refund with interest (7-15 days deadline)
2. **File RERA Complaint:** State RERA authority (filing fee ₹5,000-10,000)
3. **Consumer Court Alternative:** File through E-Daakhil for higher compensation

**Documents Required:**
• Agreement for Sale
• All payment receipts
• Possession timeline commitments
• Correspondence with builder
• RERA registration number of project

Would you like help drafting a legal notice or RERA complaint?`,
                source: 'simulated'
            };
        }
        
        // Airline / Flight complaints
        if (q.includes('flight') || q.includes('airline') || q.includes('dgca') || q.includes('cancellation') || q.includes('air india') || q.includes('indigo')) {
            return {
                success: true,
                advice: `**✈️ Flight Cancellation / Delay Advice**

Based on DGCA Civil Aviation Requirements (CAR) and your query about ${query}:

**Your Rights:**
• Flight delay > 2 hours: Airline must provide meals/refreshments
• Delay > 6 hours: You're entitled to full refund or alternative flight
• Cancellation without notice: Compensation up to ₹10,000
• Denied boarding due to overbooking: Compensation up to ₹20,000

**Recommended Actions:**
1. Contact airline customer care and note complaint number
2. Keep all documents: ticket copy, boarding pass, cancellation emails
3. File complaint on AirSewa portal (airsewa.gov.in)
4. Escalate to DGCA if unresolved in 15 days

**Compensation Calculator:**
• Delay 2-6 hours: Refreshments + communication facilities
• Delay >6 hours: Full refund + compensation ₹5,000-10,000
• Cancellation <24 hours before departure: Higher compensation applies

Would you like specific guidance for your situation?`,
                source: 'simulated'
            };
        }
        
        // Banking / Fraud complaints
        if (q.includes('bank') || q.includes('fraud') || q.includes('transaction') || q.includes('upi') || q.includes('sbi') || q.includes('hdfc')) {
            return {
                success: true,
                advice: `**🏦 Banking / Fraud Complaint Advice**

Based on RBI guidelines and your query about ${query}:

**Critical First Steps (Within 3 Days):**
• Report immediately to bank's customer care (get complaint reference number)
• If fraud reported within 3 days: Zero liability - bank must reverse full amount
• After 3 days: Limited liability up to ₹25,000

**For UPI / Digital Payment Fraud:**
1. Call 1930 (National Cyber Crime Helpline) immediately
2. File report at cybercrime.gov.in
3. Get FIR from local police for larger amounts

**Escalation Path:**
• Step 1: Bank's internal grievance redressal (30 days)
• Step 2: RBI Ombudsman (rbi.org.in)
• Step 3: Consumer court for compensation beyond ₹25,000

**Documents to Preserve:**
• Transaction screenshots / SMS alerts
• Bank statements showing disputed transactions
• All communication with bank`,
                source: 'simulated'
            };
        }
        
        // E-commerce / Refund complaints
        if (q.includes('amazon') || q.includes('flipkart') || q.includes('refund') || q.includes('order') || q.includes('delivery')) {
            return {
                success: true,
                advice: `**🛒 E-commerce / Refund Advice**

Based on Consumer Protection Act 2019 and your query about ${query}:

**Your Rights:**
• Defective/damaged product: Full refund or replacement within 30 days
• Non-delivery: Full refund + possible compensation
• Wrong item delivered: Seller must arrange return and refund at their cost
• Fake/counterfeit product: Refund + compensation up to ₹25,000

**Escalation Process:**
1. **Level 1:** Contact seller through platform
2. **Level 2:** Escalate to platform's Grievance Officer
3. **Level 3:** File on National Consumer Helpline (1915)
4. **Level 4:** E-Daakhil (Consumer Court)

**Evidence Checklist:**
• Order confirmation email
• Payment receipt
• Photos of product (if damaged/wrong)
• Screenshots of communication with seller

**Timeframes:**
• Seller response: 48 hours mandated by law
• Refund processing: Within 7-15 days
• NCH mediation: 30-45 days`,
                source: 'simulated'
            };
        }
        
        // LPG / Gas complaints
        if (q.includes('lpg') || q.includes('gas') || q.includes('cylinder') || q.includes('cooking gas')) {
            return {
                success: true,
                advice: `**🔥 LPG Cylinder / Gas Agency Complaint**

Based on PNGRB regulations and your query about ${query}:

**Delivery Issues:**
• Cylinder should be delivered within 24-48 hours of booking
• Delay beyond 48 hours: File complaint with distributor
• Repeated delays: Request distributor change

**Overcharging Complaints:**
• Any charge above MRP is illegal
• You're entitled to refund of excess + compensation up to ₹5,000

**Action Steps:**
1. **Distributor Level:** Call customer care (get complaint number)
2. **Area Manager:** Escalate if unresolved in 24 hours
3. **OMC Grievance Cell:** IOCL/BPCL/HPCL websites
4. **PNGRB:** File complaint at pngrb.gov.in
5. **Consumer Helpline:** 1915

**Helplines:**
• LPG Consumer Helpline: 1800-233-3555
• PNGRB Complaint: 1800-180-4455`,
                source: 'simulated'
            };
        }
        
        // Telecom / Internet complaints
        if (q.includes('airtel') || q.includes('jio') || q.includes('vi') || q.includes('network') || q.includes('mobile') || q.includes('broadband')) {
            return {
                success: true,
                advice: `**📱 Telecom / Network Issue Advice**

Based on TRAI regulations and your query about ${query}:

**Service Standards:**
• Call drop rate should be <2% (compensation ₹1 per dropped call)
• Broadband speed should be at least 80% of promised speed
• Billing errors must be corrected with interest

**Compensation Rules:**
• Call drops: Claim compensation monthly
• Poor internet speed: Proportionate refund
• Service outage >24 hours: Daily compensation
• Wrong billing: Full refund + interest

**Escalation Matrix:**
1. Customer Care (get ticket number)
2. Nodal Officer (15 days)
3. Appellate Authority
4. TRAI (trai.gov.in)

**Quick Tips:**
• Take speed test screenshots
• Note outage dates and times
• Keep bills for last 6 months`,
                source: 'simulated'
            };
        }
        
        // Insurance complaints
        if (q.includes('insurance') || q.includes('claim') || q.includes('policy') || q.includes('irda') || q.includes('lic')) {
            return {
                success: true,
                advice: `**🛡️ Insurance Claim Advice**

Based on IRDAI regulations and your query about ${query}:

**Claim Rejection / Delay:**
• Insurer must settle/repudiate claim within 30 days of documents
• After 30 days, interest payable at bank rate + 2%
• Wrongful rejection: Full claim amount + compensation

**Mis-selling Protection:**
• Free-look period: 15-30 days to cancel policy
• If mis-sold, entitled to full refund of premiums
• Complaint to IRDAI for agent misconduct

**Grievance Redressal:**
1. Insurer's Grievance Officer (15 days)
2. IRDAI Bima Bharosa
3. Consumer Court for higher claims

**Documents to Keep:**
• Policy document with terms
• Premium payment receipts
• Claim form acknowledgment
• Medical records / survey reports`,
                source: 'simulated'
            };
        }
        
        // Default response
        return {
            success: true,
            advice: `**🤖 Consumer Rights Advice**

Based on your query about "${query}":

I can help you with complaints about:
• ✈️ **Flights:** Cancellations, delays, refunds
• 🏦 **Banking:** Fraud, unauthorized transactions
• 🛒 **E-commerce:** Refunds, defective products
• 🏗️ **Real Estate:** Builder delays, RERA
• 📱 **Telecom:** Network issues, billing
• 🛡️ **Insurance:** Claim rejection, mis-selling
• 🔥 **LPG:** Cylinder delivery, overcharging

Please provide more details about your specific issue, including:
1. What company/service provider is involved?
2. When did the issue occur?
3. What have you tried so far?
4. What outcome are you seeking?

I'll provide specific legal advice based on Indian consumer laws.`,
            source: 'simulated'
        };
    };
        }
        
        // Banking / Fraud complaints
        if (q.includes('bank') || q.includes('fraud') || q.includes('transaction') || q.includes('upi')) {
            return {
                success: true,
                advice: `**🏦 Banking / Fraud Complaint Advice**

Under RBI guidelines and the Consumer Protection Act:

**Critical First Steps (Within 3 Days):**
- Report immediately to bank's customer care (get complaint reference number)
- If fraud reported within 3 days: Zero liability - bank must reverse full amount
- After 3 days: Limited liability up to ₹25,000 (subject to terms)

**For UPI / Digital Payment Fraud:**
1. Call 1930 (National Cyber Crime Helpline) immediately
2. File report at cybercrime.gov.in
3. Get FIR from local police (important for larger amounts)

**Escalation Path:**
- Step 1: Bank's internal grievance redressal (30 days response time)
- Step 2: If unsatisfied, approach RBI Ombudsman (rbi.org.in)
- Step 3: Consumer court for compensation beyond ₹25,000

**Documents to Preserve:**
- Transaction screenshots / SMS alerts
- Bank statements showing disputed transactions
- All communication with bank (emails, chat logs, complaint numbers)`,
                source: 'simulated'
            };
        }
        
        // E-commerce / Refund complaints
        if (q.includes('amazon') || q.includes('flipkart') || q.includes('refund') || q.includes('order') || q.includes('delivery')) {
            return {
                success: true,
                advice: `**🛒 E-commerce / Refund Advice**

Under the Consumer Protection Act 2019:

**Your Rights:**
- Defective/damaged product: Full refund or replacement within 30 days
- Non-delivery: Full refund + possible compensation for delay
- Wrong item delivered: Seller must arrange return and refund at their cost
- Fake/counterfeit product: Refund + compensation up to ₹25,000

**Escalation Process:**
1. **Level 1:** Contact seller through platform (keep chat logs)
2. **Level 2:** Escalate to platform's Grievance Officer (details in legal section)
3. **Level 3:** File on National Consumer Helpline (consumerhelpline.gov.in) - Call 1915
4. **Level 4:** E-Daakhil (Consumer Court) for claims above ₹50,000

**Evidence Checklist:**
- Order confirmation email
- Payment receipt / bank statement
- Photos of product (if damaged/wrong)
- Screenshots of communication with seller
- Delivery/tracking details

**Timeframes:**
- Seller response: 48 hours mandated by law
- Refund processing: Within 7-15 days after approval
- NCH mediation: 30-45 days`,
                source: 'simulated'
            };
        }
        
        // Real Estate / Builder complaints
        if (q.includes('builder') || q.includes('rera') || q.includes('possession') || q.includes('flat') || q.includes('apartment')) {
            return {
                success: true,
                advice: `**🏗️ Real Estate / Builder Delay Advice**

Under RERA Act 2016:

**Your Legal Rights:**
- Builder must pay interest for every month of delay (same as your EMI rate)
- If delay >1 year: You can withdraw from project and get full refund + interest
- Builder cannot change project plans without buyer consent

**Interest Calculation:**
- Rate: SBI MCLR + 2% (approximately 10-11% annually)
- Interest payable from original possession date to actual possession
- For refund cases: Interest from each payment date until refund

**Action Plan:**
1. **Send Legal Notice:** Demand possession or refund with interest (7-15 days deadline)
2. **File RERA Complaint:** State RERA authority (filing fee ₹5,000-10,000)
3. **Consumer Court Alternative:** File through E-Daakhil for higher compensation

**Documents Required:**
- Agreement for Sale
- All payment receipts
- Possession timeline commitments
- Correspondence with builder
- RERA registration number of project`,
                source: 'simulated'
            };
        }
        
        // LPG / Gas complaints
        if (q.includes('lpg') || q.includes('gas') || q.includes('cylinder') || q.includes('cooking gas')) {
            return {
                success: true,
                advice: `**🔥 LPG Cylinder / Gas Agency Complaint**

Under PNGRB regulations and Consumer Protection Act:

**Delivery Issues:**
- Cylinder should be delivered within 24-48 hours of booking
- Delay beyond 48 hours: File complaint with distributor
- Repeated delays: Request distributor change

**Overcharging Complaints:**
- LPG prices fixed monthly by OMCs (IOCL/BPCL/HPCL)
- Any charge above MRP is illegal
- You're entitled to refund of excess + compensation up to ₹5,000

**Action Steps:**
1. **Distributor Level:** Call customer care (get complaint number)
2. **Area Manager:** Escalate if unresolved in 24 hours
3. **OMC Grievance Cell:** Register on company website (IOCL/BPCL/HPCL)
4. **PNGRB:** File complaint at pngrb.gov.in
5. **Consumer Helpline:** 1915 for additional support

**Helplines:**
- LPG Consumer Helpline: 1800-233-3555
- PNGRB Complaint: 1800-180-4455
- National Consumer Helpline: 1915`,
                source: 'simulated'
            };
        }
        
        // Default response
        return {
            success: true,
            advice: `**🤖 Consumer Rights Advice**

I can help you with complaints about:
- ✈️ **Flights:** Cancellations, delays, refunds (DGCA rules)
- 🏦 **Banking:** Fraud, unauthorized transactions, RBI Ombudsman
- 🛒 **E-commerce:** Refunds, defective products, delivery issues
- 🏗️ **Real Estate:** Builder delays, RERA complaints
- 📱 **Telecom:** Network issues, billing, TRAI regulations
- 🛡️ **Insurance:** Claim rejection, mis-selling, IRDAI
- 🔥 **LPG:** Cylinder delivery, overcharging

Please tell me more about your specific issue, including:
1. What company/service provider is involved?
2. When did the issue occur?
3. What have you tried so far?
4. What outcome are you seeking?

I'll provide specific legal advice based on Indian consumer laws.`,
            source: 'simulated'
        };
    }
}

export const aiService = new OpenAIService();