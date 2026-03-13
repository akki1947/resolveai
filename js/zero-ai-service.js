// js/zero-ai-service.js
// Completely free, no API calls, no costs - WORKING VERSION

class ZeroAIService {
    constructor() {
        console.log('✅ Zero AI Service initialized');
    }

    getAdvice(query, type = 'general') {
        const q = query.toLowerCase();
        
        // BUILDER / REAL ESTATE
        if (q.includes('builder') || q.includes('rera') || q.includes('possession') || 
            q.includes('flat') || q.includes('apartment') || q.includes('property') ||
            q.includes('construction') || q.includes('delay') && q.includes('house')) {
            
            return {
                success: true,
                advice: `**🏗️ Builder Delay - What to Ask For**

**Your Legal Rights under RERA Act 2016:**
• Builder MUST pay interest for EVERY month of delay
• Interest rate: SBI MCLR + 2% (currently ~10-11% per year)
• If delay > 1 year: You can demand FULL REFUND + interest

**💰 Calculate Your Compensation:**
For a property worth ₹50,00,000 delayed by 2 years:
• Interest per year: ₹50,00,000 × 10% = ₹5,00,000
• Total for 2 years: ₹10,00,000

**📝 Negotiation Script:**
"Dear Builder, as per RERA Act 2016 Section 18, you are liable to pay interest of ___% for the ___ months delay. I calculate this as ₹___. Please arrange payment within 7 days."

**⚖️ Legal Basis:**
RERA Act 2016, Section 18 - Builder's liability for delay

**📋 Next Steps:**
1. Send this demand via email and registered post
2. Give 15 days deadline
3. File RERA complaint if no response
4. Alternatively, approach Consumer Court`
            };
        }
        
        // AIRLINE / FLIGHT
        if (q.includes('flight') || q.includes('airline') || q.includes('dgca') || 
            q.includes('cancellation') || q.includes('air india') || q.includes('indigo') ||
            q.includes('spicejet') || q.includes('delay')) {
            
            return {
                success: true,
                advice: `**✈️ Flight Delay/Cancellation - What to Ask For**

**Your Rights under DGCA Rules:**

**For Delay 2-6 hours:**
• Free meals and refreshments
• Communication facilities (calls/internet)

**For Delay >6 hours:**
• Full refund of ticket cost OR
• Alternative flight at no extra cost
• PLUS compensation of ₹5,000 - ₹10,000

**For Cancellation:**
• Full refund + compensation up to ₹10,000
• If cancelled within 24 hours of departure: Higher compensation

**For Denied Boarding (Overbooking):**
• Compensation up to ₹20,000 + alternative flight

**📝 Negotiation Script:**
"Dear Airline, as per DGCA rules, I am entitled to compensation of ₹___ for the ___ hours delay/cancellation. Please process this immediately."

**⚖️ Legal Basis:**
DGCA Civil Aviation Requirements (CAR) Section 3, Series M, Part IV

**📋 Next Steps:**
1. Contact airline customer care with reference number
2. If unresolved in 15 days, file on AirSewa portal (airsewa.gov.in)
3. Escalate to DGCA`
            };
        }
        
        // BANKING / FRAUD
        if (q.includes('bank') || q.includes('fraud') || q.includes('transaction') || 
            q.includes('upi') || q.includes('sbi') || q.includes('hdfc') || q.includes('icici') ||
            q.includes('money') || q.includes('debit') || q.includes('credit')) {
            
            return {
                success: true,
                advice: `**🏦 Bank Fraud - What to Ask For**

**⚠️ CRITICAL: Report within 3 days for FULL refund!**

**Compensation Rules:**
• Reported within 3 days: ZERO liability (full refund)
• Reported after 3 days: Limited to ₹25,000
• Bank negligence: Full refund + compensation for harassment

**💰 What to Demand:**
• Full amount fraudulently deducted: ₹___
• Interest at bank rate from date of deduction
• Compensation for mental harassment: ₹5,000 - ₹25,000

**📝 Negotiation Script:**
"Dear Bank, as per RBI guidelines, this unauthorized transaction of ₹___ must be reversed immediately. I reported this on [date] within [X] days. Please credit my account within 3 days."

**⚖️ Legal Basis:**
RBI Circular on Limiting Liability of Customers in Unauthorised Transactions (2017)

**📋 Immediate Steps:**
1. Call 1930 - National Cyber Crime Helpline
2. File report at cybercrime.gov.in
3. Get complaint reference number from bank
4. File FIR at local police station for large amounts`
            };
        }
        
        // E-COMMERCE / REFUND
        if (q.includes('amazon') || q.includes('flipkart') || q.includes('myntra') || 
            q.includes('ajio') || q.includes('meesho') || q.includes('order') || 
            q.includes('refund') || q.includes('delivery') || q.includes('return') ||
            q.includes('product')) {
            
            return {
                success: true,
                advice: `**🛒 E-commerce Refund - What to Ask For**

**Your Rights under Consumer Protection Act:**

**Defective/Damaged Product:**
• Full refund within 30 days of return
• Replacement at seller's cost

**Non-Delivery:**
• Full refund within 7 days
• Compensation for delay: ₹500 - ₹5,000

**Wrong Item Delivered:**
• Full refund + seller pays return shipping
• Compensation for inconvenience

**Fake/Counterfeit Product:**
• Full refund + compensation up to ₹25,000
• File police complaint for cheating

**💰 Calculate Your Claim:**
• Product cost: ₹___
• Refund delay compensation: ₹500 per week of delay
• Total demand: ₹___

**📝 Negotiation Script:**
"Dear Seller, I have still not received my refund of ₹___ for order #___ despite [X] days. Under Consumer Protection Act, I demand immediate refund plus compensation of ₹___."

**⚖️ Legal Basis:**
Consumer Protection Act 2019, Section 2(9) - Unfair trade practice

**📋 Escalation Path:**
1. Platform Grievance Officer (48 hours)
2. National Consumer Helpline - 1915
3. E-Daakhil (Consumer Court)`
            };
        }
        
        // TELECOM / INTERNET
        if (q.includes('airtel') || q.includes('jio') || q.includes('vi') || 
            q.includes('vodafone') || q.includes('network') || q.includes('mobile') || 
            q.includes('broadband') || q.includes('call') || q.includes('internet')) {
            
            return {
                success: true,
                advice: `**📱 Telecom - What to Ask For**

**Service Standards (TRAI):**

**Call Drops:**
• Compensation: ₹1 per dropped call
• File monthly claim with call logs

**Slow Internet / Broadband:**
• Proportionate refund for speed below promised
• Example: If speed is 50% of promised, get 50% refund

**Billing Errors:**
• Full refund of wrong charges + interest
• Compensation for harassment: ₹1,000 - ₹5,000

**Service Outage >24 Hours:**
• Daily compensation: 1/30th of monthly bill
• Full refund for outage period

**📝 Negotiation Script:**
"Dear Provider, my service has been affected by [issue] for [X] days. As per TRAI standards, I am entitled to compensation of ₹___. Please credit my account within 7 days."

**⚖️ Legal Basis:**
TRAI Standards of Quality of Service Regulations

**📋 Escalation:**
1. Customer Care (get ticket number)
2. Nodal Officer (15 days)
3. Appellate Authority
4. TRAI (trai.gov.in)`
            };
        }
        
        // INSURANCE
        if (q.includes('insurance') || q.includes('claim') || q.includes('policy') || 
            q.includes('irda') || q.includes('lic') || q.includes('health') || 
            q.includes('term') || q.includes('life')) {
            
            return {
                success: true,
                advice: `**🛡️ Insurance Claim - What to Ask For**

**Your Rights under IRDAI:**

**Claim Delay:**
• Settlement within 30 days of documents
• After 30 days: Interest at bank rate + 2%
• For every month of delay, add 2% interest

**Claim Rejection:**
• If wrongful: Full claim amount + compensation
• Compensation: 25% of claim amount or ₹1 lakh, whichever higher

**Mis-selling:**
• Full refund of all premiums paid
• Interest at 10% on premiums
• Compensation up to ₹50,000

**💰 Calculate Your Claim:**
• Claim amount: ₹___
• Interest for delay: ___% = ₹___
• Total demand: ₹___

**📝 Negotiation Script:**
"Dear Insurer, my claim #___ has been pending for [X] days beyond the 30-day limit. I demand immediate settlement with interest at ___% as per IRDAI guidelines."

**⚖️ Legal Basis:**
IRDAI Protection of Policyholders' Interests Regulations

**📋 Escalation:**
1. Insurer's Grievance Officer (15 days)
2. IRDAI Bima Bharosa (bimabharosa.irdai.gov.in)
3. Consumer Court`
            };
        }
        
        // LPG / GAS
        if (q.includes('lpg') || q.includes('gas') || q.includes('cylinder') || 
            q.includes('cooking') || q.includes('indane') || q.includes('hp') || 
            q.includes('bharat')) {
            
            return {
                success: true,
                advice: `**🔥 LPG / Gas - What to Ask For**

**Delivery Issues:**
• Delivery within 24-48 hours of booking
• Delay beyond 48 hours: Compensation ₹100 per day
• Repeated delays: Request distributor change

**Overcharging:**
• Any amount above MRP is ILLEGAL
• Refund of excess + compensation up to ₹5,000
• Penalty on distributor up to ₹25,000

**💰 Calculate Your Claim:**
• Excess charged: ₹___
• Compensation: ₹1,000 - ₹5,000
• Total demand: ₹___

**📝 Negotiation Script:**
"Dear Distributor, I was overcharged by ₹___ for cylinder booking #___. This is illegal under PNGRB regulations. Please refund the excess plus compensation immediately."

**⚖️ Legal Basis:**
PNGRB Regulations and Essential Commodities Act

**📋 Helplines:**
• LPG Consumer Helpline: 1800-233-3555
• PNGRB Complaint: 1800-180-4455
• National Consumer Helpline: 1915

**📋 Escalation:**
1. Distributor Manager
2. Area Manager
3. OMC Grievance Cell (IOCL/BPCL/HPCL)
4. PNGRB (pngrb.gov.in)`
            };
        }
        
        // DEFAULT RESPONSE
        return {
            success: true,
            advice: `**🤝 How Can I Help You Negotiate?**

I can help you demand compensation for:
• ✈️ **Flight delays/cancellations** - Ask for ₹5,000-10,000
• 🏦 **Bank fraud** - Demand full refund within 3 days
• 🛒 **E-commerce refunds** - Claim product cost + compensation
• 🏗️ **Builder delays** - Demand 10-11% annual interest
• 📱 **Telecom issues** - Claim refund for poor service
• 🛡️ **Insurance claims** - Demand interest for delays
• 🔥 **LPG complaints** - Claim refund of excess + compensation

**Please tell me your specific issue** like:
- "Flight delayed 6 hours, how much compensation?"
- "Builder possession delayed 2 years, what interest?"
- "Bank fraud of ₹50,000, how to get refund?"
- "Amazon not refunding for 30 days"`,
            source: 'zero-ai'
        };
    }
}

export const aiService = new ZeroAIService();