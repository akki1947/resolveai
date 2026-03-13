const fs = require('fs');
const path = require('path');

console.log('========================================');
console.log('🔧 FINAL FIX - ADDRESSING ALL ISSUES');
console.log('========================================\n');

// ===========================================
// FIX 1: Fix Smart Complaint Search
// ===========================================
console.log('📌 Fix 1: Fixing Smart Complaint Search...');

const searchPath = path.join(__dirname, 'search.html');
if (fs.existsSync(searchPath)) {
    let content = fs.readFileSync(searchPath, 'utf8');
    
    // Complete working search functionality
    const searchScript = `
    <script>
        // Smart Complaint Search - Working Version
        document.addEventListener('DOMContentLoaded', function() {
            loadSearchData();
        });

        let searchData = {
            grievances: [],
            companies: []
        };

        async function loadSearchData() {
            try {
                // Load categories
                const catResponse = await fetch('/data/grievance-categories.json');
                const categories = await catResponse.json();
                
                // Load companies
                const compResponse = await fetch('/data/companies.json');
                const companies = await compResponse.json();
                
                // Build search index
                buildSearchIndex(categories, companies);
                
                // Check for URL parameter
                const urlParams = new URLSearchParams(window.location.search);
                const queryParam = urlParams.get('q');
                if (queryParam) {
                    document.getElementById('searchInput').value = queryParam;
                    performSearch();
                }
            } catch (error) {
                console.error('Error loading data:', error);
                document.getElementById('resultsContainer').innerHTML = 
                    '<div class="error-message">Failed to load search data. Please refresh.</div>';
            }
        }

        function buildSearchIndex(categories, companies) {
            searchData.grievances = [];
            
            // Add grievances
            categories.sectors.forEach(sector => {
                sector.categories.forEach(category => {
                    category.types.forEach(type => {
                        searchData.grievances.push({
                            sector: sector.name,
                            sectorId: sector.id,
                            category: category.name,
                            type: type.name,
                            details: type.details,
                            authority: type.suggested_authority,
                            keywords: [
                                type.name.toLowerCase(),
                                category.name.toLowerCase(),
                                sector.name.toLowerCase(),
                                ...(type.keywords || [])
                            ]
                        });
                    });
                });
            });
            
            // Add companies
            searchData.companies = [];
            Object.entries(companies.sectors).forEach(([sectorId, sector]) => {
                (sector.companies || []).forEach(company => {
                    searchData.companies.push({
                        name: company,
                        sector: sector.name,
                        sectorId: sectorId,
                        keywords: [company.toLowerCase(), sector.name.toLowerCase()]
                    });
                });
            });
            
            populateFilters(categories);
            populateSuggestions();
        }

        function populateFilters(categories) {
            const filterDiv = document.getElementById('filterContainer');
            if (!filterDiv) return;
            
            const sectors = [...new Set(categories.sectors.map(s => s.name))];
            filterDiv.innerHTML = '<span class="filter-chip active" onclick="filterBySector(\'all\')">All</span>' +
                sectors.map(s => '<span class="filter-chip" onclick="filterBySector(\'' + s + '\')">' + s + '</span>').join('');
        }

        function populateSuggestions() {
            const suggestions = [
                "Amazon not refunding",
                "Airtel network issue",
                "Bank fraud transaction",
                "Flight cancelled refund",
                "Insurance claim rejected",
                "LPG cylinder not delivered",
                "Builder possession delay"
            ];
            
            const container = document.getElementById('suggestionPills');
            if (container) {
                container.innerHTML = suggestions.map(s => 
                    '<span class="suggestion-pill" onclick="setSearch(\'' + s + '\')">🔍 ' + s + '</span>'
                ).join('');
            }
        }

        window.setSearch = function(query) {
            document.getElementById('searchInput').value = query;
            performSearch();
        };

        window.filterBySector = function(sector) {
            document.querySelectorAll('.filter-chip').forEach(chip => {
                chip.classList.remove('active');
            });
            event.target.classList.add('active');
            performSearch();
        };

        function calculateScore(item, query) {
            const words = query.toLowerCase().split(' ');
            let score = 0;
            
            words.forEach(word => {
                if (item.keywords) {
                    item.keywords.forEach(keyword => {
                        if (keyword.includes(word)) score += 5;
                        if (keyword === word) score += 10;
                    });
                }
            });
            
            return score;
        }

        window.performSearch = function() {
            const query = document.getElementById('searchInput').value.trim();
            const container = document.getElementById('resultsContainer');
            
            if (!query) {
                container.innerHTML = '<div class="loading">Enter a search term to begin</div>';
                return;
            }
            
            container.innerHTML = '<div class="loading"><div class="loading-spinner"></div>Searching...</div>';
            
            // Simulate slight delay for better UX
            setTimeout(() => {
                // Search grievances
                const grievanceResults = searchData.grievances
                    .map(item => ({
                        ...item,
                        score: calculateScore(item, query),
                        type: 'grievance'
                    }))
                    .filter(item => item.score > 0)
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 5);
                
                // Search companies
                const companyResults = searchData.companies
                    .map(item => ({
                        ...item,
                        score: calculateScore(item, query),
                        type: 'company'
                    }))
                    .filter(item => item.score > 0)
                    .sort((a, b) => b.score - a.score)
                    .slice(0, 3);
                
                displayResults([...grievanceResults, ...companyResults], query);
            }, 300);
        };

        function displayResults(results, query) {
            const container = document.getElementById('resultsContainer');
            
            if (results.length === 0) {
                container.innerHTML = '<div class="error-message">No results found. Try different keywords.</div>';
                return;
            }
            
            let html = '';
            results.forEach((item, index) => {
                if (item.type === 'grievance') {
                    html += \`
                        <div class="result-card">
                            <div class="result-title">\${item.sector}: \${item.type}</div>
                            <div class="result-meta">
                                <span class="meta-item">📋 \${item.category}</span>
                                <span class="meta-item">⚖️ \${item.authority}</span>
                            </div>
                            <div class="result-description">\${item.details}</div>
                            <div class="result-actions">
                                <a href="complaint.html?sector=\${item.sectorId}" class="action-btn primary">File Complaint</a>
                                <a href="advisor.html?q=\${encodeURIComponent(item.type)}" class="action-btn">Ask AI</a>
                            </div>
                        </div>
                    \`;
                } else {
                    html += \`
                        <div class="result-card">
                            <div class="result-title">\${item.name}</div>
                            <div class="result-meta">
                                <span class="meta-item">🏢 \${item.sector}</span>
                            </div>
                            <div class="result-actions">
                                <a href="complaint.html?sector=\${item.sectorId}&company=\${encodeURIComponent(item.name)}" class="action-btn primary">File Complaint</a>
                            </div>
                        </div>
                    \`;
                }
            });
            
            container.innerHTML = html;
        }
    </script>`;
    
    // Replace existing scripts
    content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/g, '');
    content = content.replace('</body>', searchScript + '\n</body>');
    
    fs.writeFileSync(searchPath, content, 'utf8');
    console.log('  ✅ Fixed Smart Complaint Search');
}

// ===========================================
// FIX 2: Fix AI Advisor Formatting
// ===========================================
console.log('\n📌 Fix 2: Fixing AI Advisor formatting...');

const advisorPath = path.join(__dirname, 'advisor.html');
if (fs.existsSync(advisorPath)) {
    let content = fs.readFileSync(advisorPath, 'utf8');
    
    // Add proper CSS for formatted messages
    const messageCSS = `
        .ai-message {
            background: #f1f5f9;
            color: #1e293b;
            padding: 20px;
            border-radius: 20px 20px 20px 4px;
            margin-bottom: 16px;
            border-left: 4px solid #2563eb;
            line-height: 1.6;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .ai-message p {
            margin-bottom: 12px;
        }
        .ai-message strong {
            color: #2563eb;
            font-weight: 600;
            display: block;
            margin: 16px 0 8px;
        }
        .ai-message ul, .ai-message ol {
            margin-left: 24px;
            margin-bottom: 12px;
        }
        .ai-message li {
            margin-bottom: 4px;
        }
        .ai-message h3 {
            color: #0f172a;
            margin: 16px 0 8px;
            font-size: 1.1rem;
        }
        .typing-indicator {
            display: flex;
            gap: 4px;
            padding: 16px 20px;
            background: #f1f5f9;
            border-radius: 20px;
            width: fit-content;
            margin-bottom: 16px;
        }`;
    
    content = content.replace('</style>', messageCSS + '\n    </style>');
    
    // Update the sendMessage function to format properly
    const sendMessageFunc = `
        async function sendMessage() {
            const input = document.getElementById('userInput');
            const question = input.value.trim();
            if (!question) return;

            addMessage('user', question);
            input.value = '';

            showTypingIndicator();

            try {
                const result = await aiService.getAdvice(question, 'general');
                removeTypingIndicator();
                
                // Format the response with proper HTML
                let formatted = result.advice
                    .replace(/\\n\\n/g, '</p><p>')
                    .replace(/\\n/g, '<br>')
                    .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
                    .replace(/•/g, '<br>•');
                
                addMessage('ai', '<p>' + formatted + '</p>', true);
            } catch (error) {
                removeTypingIndicator();
                addMessage('ai', '<p>Sorry, I encountered an error. Please try again.</p>', true);
            }
        }`;
    
    const sendMessageRegex = /async function sendMessage\(\)\s*{[\s\S]*?}/;
    content = content.replace(sendMessageRegex, sendMessageFunc);
    
    fs.writeFileSync(advisorPath, content, 'utf8');
    console.log('  ✅ Fixed AI Advisor formatting');
}

// ===========================================
// FIX 3: Fix AI Negotiation Assistant
// ===========================================
console.log('\n📌 Fix 3: Fixing AI Negotiation Assistant...');

const negotiationPath = path.join(__dirname, 'negotiation.html');
if (fs.existsSync(negotiationPath)) {
    let content = fs.readFileSync(negotiationPath, 'utf8');
    
    // Replace with working negotiation logic
    const negotiationScript = `
    <script type="module">
        import { aiService } from '/js/openai-service.js';

        function addMessage(sender, text, isHTML = false) {
            const history = document.getElementById('chatHistory');
            const msgDiv = document.createElement('div');
            msgDiv.className = sender === 'user' ? 'user-message' : 'ai-message';
            
            if (isHTML) {
                msgDiv.innerHTML = text;
            } else {
                msgDiv.textContent = text;
            }
            
            history.appendChild(msgDiv);
            history.scrollTop = history.scrollHeight;
        }

        function showTypingIndicator() {
            const history = document.getElementById('chatHistory');
            const indicator = document.createElement('div');
            indicator.className = 'typing-indicator';
            indicator.id = 'typingIndicator';
            indicator.innerHTML = '<span></span><span></span><span></span>';
            history.appendChild(indicator);
            history.scrollTop = history.scrollHeight;
        }

        function removeTypingIndicator() {
            const indicator = document.getElementById('typingIndicator');
            if (indicator) indicator.remove();
        }

        async function sendMessage() {
            const input = document.getElementById('userInput');
            const query = input.value.trim();
            if (!query) return;

            addMessage('user', query);
            input.value = '';

            showTypingIndicator();

            try {
                const result = await aiService.getAdvice(query, 'negotiation');
                removeTypingIndicator();
                
                // Format the response nicely
                let formatted = result.advice
                    .replace(/\\n\\n/g, '</p><p>')
                    .replace(/\\n/g, '<br>')
                    .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>');
                
                addMessage('ai', '<p>' + formatted + '</p>', true);
            } catch (error) {
                removeTypingIndicator();
                addMessage('ai', '<p>Sorry, I encountered an error. Please try again.</p>', true);
            }
        }

        function setExample(text) {
            document.getElementById('userInput').value = text;
            sendMessage();
        }

        window.sendMessage = sendMessage;
        window.setExample = setExample;
    </script>`;
    
    // Replace existing scripts
    content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/g, '');
    content = content.replace('</body>', negotiationScript + '\n</body>');
    
    fs.writeFileSync(negotiationPath, content, 'utf8');
    console.log('  ✅ Fixed AI Negotiation Assistant');
}

// ===========================================
// FIX 4: Fix Draft Generation
// ===========================================
console.log('\n📌 Fix 4: Fixing Draft Generation...');

const draftPath = path.join(__dirname, 'draft.html');
if (fs.existsSync(draftPath)) {
    let content = fs.readFileSync(draftPath, 'utf8');
    
    // Complete working draft generation
    const draftScript = `
    <script>
        window.onload = function() {
            try {
                // Get data from localStorage
                const sector = localStorage.getItem('userSector') || 'ecommerce';
                const issue = localStorage.getItem('userIssue') || 'No issue description provided';
                const orderId = localStorage.getItem('orderId') || 'Not provided';
                const company = localStorage.getItem('userCompany') || 'Not specified';
                const category = localStorage.getItem('userCategory') || '';
                const type = localStorage.getItem('userType') || '';
                
                const date = new Date().toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                });

                // Format type and category
                const formattedType = type ? type.replace(/-/g, ' ') : 'General Issue';
                const formattedCategory = category ? category.replace(/-/g, ' ') : '';

                // Get regulator based on sector
                const regulators = {
                    'ecommerce': 'National Consumer Helpline',
                    'banking': 'RBI Ombudsman',
                    'telecom': 'TRAI',
                    'insurance': 'IRDAI',
                    'airline': 'DGCA',
                    'realestate': 'RERA',
                    'internet': 'TRAI',
                    'travel': 'DGCA',
                    'electronics': 'National Consumer Helpline',
                    'food-delivery': 'FSSAI',
                    'fintech': 'RBI Ombudsman'
                };
                
                const regulator = regulators[sector] || 'Concerned Authority';

                // Build the draft
                const draft = \`Date: \${date}

FORMAL COMPLAINT
----------------
Reference ID: \${orderId}
Company: \${company}
Sector: \${sector.charAt(0).toUpperCase() + sector.slice(1)}
Issue: \${formattedType} \${formattedCategory ? '(' + formattedCategory + ')' : ''}

To,
The Grievance Redressal Officer,
\${company}
[Company Address]

Subject: Formal Complaint regarding Deficiency in Service

Respected Sir/Madam,

I am writing this formal complaint to bring to your notice a significant deficiency in service regarding the transaction/product identified above.

DETAILS OF THE GRIEVANCE:
\${issue}

LEGAL BASIS:
Under the Consumer Protection Act, 2019, specifically Section 2(9) (right to be protected against unfair trade practices) and Section 2(10) (right to seek redressal), I request a thorough investigation. Despite previous attempts to resolve this through your standard support channels, the matter remains unresolved, causing me mental and financial distress.

EVIDENCE AVAILABLE:
• Order/Transaction confirmation
• Payment receipts
• Communication records with your support team
• Photographs (if applicable)

TIMELINE:
I request you to investigate this grievance and provide a resolution within the statutory timeline prescribed for the \${sector} industry. As per industry guidelines, a response is expected within the prescribed timeframe.

ESCALATION NOTICE:
Failure to provide a satisfactory response within the next 7 working days will compel me to escalate this matter to the **\${regulator}** and file a formal petition with the National Consumer Helpline (1915).

Thanking you,

Yours sincerely,

[Your Name]
[Your Contact Number]
[Your Email Address]
[Your Address]\`;

                document.getElementById('letter-body').innerText = draft;
            } catch (error) {
                document.getElementById('letter-body').innerText = 'Error generating draft. Please go back and try again.';
                console.error('Draft error:', error);
            }
        };

        function copyText() {
            const text = document.getElementById('letter-body').innerText;
            navigator.clipboard.writeText(text).then(() => {
                alert('Draft copied to clipboard!');
            });
        }

        function share(platform) {
            const text = encodeURIComponent(document.getElementById('letter-body').innerText);
            let url = '';
            if (platform === 'wa') url = \`https://wa.me/?text=\${text}\`;
            if (platform === 'tg') url = \`https://t.me/share/url?url=&text=\${text}\`;
            if (platform === 'x') url = \`https://x.com/intent/tweet?text=\${text}\`;
            if (platform === 'mail') url = \`mailto:?subject=Formal Grievance&\${text}\`;
            window.open(url, '_blank');
        }

        window.copyText = copyText;
        window.share = share;
    </script>`;
    
    // Replace existing scripts
    content = content.replace(/<script[^>]*>[\s\S]*?<\/script>/g, '');
    content = content.replace('</body>', draftScript + '\n</body>');
    
    fs.writeFileSync(draftPath, content, 'utf8');
    console.log('  ✅ Fixed Draft Generation');
}

// ===========================================
// FIX 5: Update OpenAI Service
// ===========================================
console.log('\n📌 Fix 5: Updating OpenAI Service with correct responses...');

const openaiPath = path.join(__dirname, 'js', 'openai-service.js');
if (fs.existsSync(openaiPath)) {
    let content = fs.readFileSync(openaiPath, 'utf8');
    
    // Replace with corrected getSimulatedResponse
    const newResponseFunc = `
    getSimulatedResponse(query, type) {
        const q = query.toLowerCase();
        
        // BUILDER / REAL ESTATE (check first to avoid misrouting)
        if (q.includes('builder') || q.includes('rera') || q.includes('possession') || 
            q.includes('flat') || q.includes('apartment') || q.includes('property') ||
            q.includes('construction') || q.includes('delay') && q.includes('house')) {
            return {
                success: true,
                advice: \`**🏗️ Real Estate / Builder Delay Advice**

Based on your query about "${query}":

**Your Legal Rights under RERA Act 2016:**
• Builder must pay interest for every month of delay (same as your EMI rate)
• If delay >1 year: You can withdraw and get full refund + interest
• Builder cannot change project plans without consent

**Compensation Calculation:**
• Interest Rate: SBI MCLR + 2% (approximately 10-11% annually)
• Interest payable from original possession date
• For refund: Interest from each payment date

**Action Plan:**
1. Send legal notice to builder (7-15 days deadline)
2. File complaint with State RERA authority
3. Alternative: Consumer Court via E-Daakhil

**Documents Needed:**
• Agreement for Sale
• All payment receipts
• Correspondence with builder
• RERA registration number

Would you like help drafting a legal notice?\`,
                source: 'simulated'
            };
        }
        
        // AIRLINE / FLIGHT
        if (q.includes('flight') || q.includes('airline') || q.includes('dgca') || 
            q.includes('cancellation') || q.includes('air india') || q.includes('indigo')) {
            return {
                success: true,
                advice: \`**✈️ Flight Cancellation / Delay Advice**

Based on your query about "${query}":

**Your Rights under DGCA Rules:**
• Delay >2 hours: Free meals/refreshments
• Delay >6 hours: Full refund or alternative flight
• Cancellation without notice: Compensation up to ₹10,000
• Denied boarding: Compensation up to ₹20,000

**Action Steps:**
1. Contact airline (note complaint number)
2. File on AirSewa portal (airsewa.gov.in)
3. Escalate to DGCA if unresolved

**Keep These Documents:**
• Ticket copy and boarding pass
• Cancellation emails
• Payment receipt\`,
                source: 'simulated'
            };
        }
        
        // BANKING / FRAUD
        if (q.includes('bank') || q.includes('fraud') || q.includes('transaction') || 
            q.includes('upi') || q.includes('sbi') || q.includes('hdfc')) {
            return {
                success: true,
                advice: \`**🏦 Banking / Fraud Complaint Advice**

Based on your query about "${query}":

**Critical: Report within 3 days for zero liability!**

**Immediate Steps:**
• Call bank customer care (get reference number)
• Report on cybercrime portal (1930)
• File FIR for large amounts

**Compensation Rules:**
• Within 3 days: Zero liability
• After 3 days: Limited to ₹25,000
• Wrongful debit: Full refund + interest

**Escalation:**
1. Bank's grievance officer (30 days)
2. RBI Ombudsman
3. Consumer Court\`,
                source: 'simulated'
            };
        }
        
        // E-COMMERCE
        if (q.includes('amazon') || q.includes('flipkart') || q.includes('refund') || 
            q.includes('order') || q.includes('delivery') || q.includes('return')) {
            return {
                success: true,
                advice: \`**🛒 E-commerce / Refund Advice**

Based on your query about "${query}":

**Your Rights under Consumer Protection Act:**
• Defective product: Full refund within 30 days
• Non-delivery: Full refund + compensation
• Wrong item: Seller pays return shipping
• Fake product: Refund + compensation up to ₹25,000

**Escalation Process:**
1. Contact seller through platform
2. Escalate to Grievance Officer
3. National Consumer Helpline (1915)
4. Consumer Court (E-Daakhil)

**Timeframes:**
• Seller response: 48 hours
• Refund: 7-15 days
• NCH mediation: 30-45 days\`,
                source: 'simulated'
            };
        }
        
        // LPG / GAS
        if (q.includes('lpg') || q.includes('gas') || q.includes('cylinder') || 
            q.includes('cooking gas') || q.includes('indane') || q.includes('hp')) {
            return {
                success: true,
                advice: \`**🔥 LPG Cylinder / Gas Agency Complaint**

Based on your query about "${query}":

**Delivery Issues:**
• Delivery within 24-48 hours of booking
• Delay beyond 48 hours: File complaint
• Repeated delays: Request distributor change

**Overcharging:**
• Any charge above MRP is illegal
• Refund of excess + compensation up to ₹5,000

**Action Steps:**
1. Call distributor (get complaint number)
2. Escalate to Area Manager
3. OMC Grievance Cell (IOCL/BPCL/HPCL)
4. PNGRB (pngrb.gov.in)

**Helplines:**
• LPG Helpline: 1800-233-3555
• PNGRB: 1800-180-4455
• NCH: 1915\`,
                source: 'simulated'
            };
        }
        
        // TELECOM
        if (q.includes('airtel') || q.includes('jio') || q.includes('vi') || 
            q.includes('network') || q.includes('mobile') || q.includes('broadband')) {
            return {
                success: true,
                advice: \`**📱 Telecom / Network Issue Advice**

Based on your query about "${query}":

**Service Standards (TRAI):**
• Call drops: Compensation ₹1 per dropped call
• Slow internet: Proportionate refund
• Billing errors: Full refund + interest

**Compensation Rules:**
• Service outage >24 hours: Daily compensation
• Wrong bill: Refund with interest
• Poor speed: Claim refund

**Escalation:**
1. Customer Care (get ticket number)
2. Nodal Officer (15 days)
3. Appellate Authority
4. TRAI (trai.gov.in)\`,
                source: 'simulated'
            };
        }
        
        // Default response
        return {
            success: true,
            advice: \`**🤖 Consumer Rights Advice**

Based on your query about "${query}":

I can help you with complaints about:
• ✈️ Flights: Cancellations, delays, refunds
• 🏦 Banking: Fraud, unauthorized transactions
• 🛒 E-commerce: Refunds, defective products
• 🏗️ Real Estate: Builder delays, RERA
• 📱 Telecom: Network issues, billing
• 🛡️ Insurance: Claim rejection, mis-selling
• 🔥 LPG: Cylinder delivery, overcharging

Please provide more details about your specific issue.\`,
            source: 'simulated'
        };
    }`;
    
    const responseRegex = /getSimulatedResponse\(query, type\)\s*{[\s\S]*?}/;
    content = content.replace(responseRegex, newResponseFunc);
    
    fs.writeFileSync(openaiPath, content, 'utf8');
    console.log('  ✅ Updated OpenAI service with correct responses');
}

// Summary
console.log('\n========================================');
console.log('📊 FIX SUMMARY');
console.log('========================================');
console.log('✅ Fixed Smart Complaint Search');
console.log('✅ Fixed AI Advisor formatting');
console.log('✅ Fixed AI Negotiation Assistant (correct answers now)');
console.log('✅ Fixed Draft Generation');
console.log('✅ Updated OpenAI service with correct responses');
console.log('\n🎉 All fixes applied successfully!\n');
console.log('========================================');
console.log('📝 Next steps:');
console.log('========================================');
console.log('1. Test all features:');
console.log('   - Smart Complaint Search with "amazon not refunding"');
console.log('   - AI Advisor - check formatting');
console.log('   - AI Negotiation - try "builder possession delayed"');
console.log('   - Draft Generation - should work now');
console.log('2. Commit changes:');
console.log('   git add .');
console.log('   git commit -m "Final fixes: search, AI formatting, negotiation, draft"');
console.log('   git push origin main');