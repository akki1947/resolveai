const fs = require('fs');
const path = require('path');

// Files that might contain authorityMap
const filesToCheck = [
    'result.html',
    'complaint.html',
    'draft.html',
    'case.html',
    'search.html',
    'advisor.html',
    'negotiation.html'
];

// Correct authority mappings with updated URLs
const correctedAuthorityMap = {
    "banking": {
        "regulator": "RBI Ombudsman",
        "description": "Banking and financial services disputes",
        "website": "https://rbi.org.in/commonman/English/Scripts/Complaint.aspx",
        "wait_days": 30,
        "path": ["Customer Care", "Internal Nodal Officer", "Banking Ombudsman"]
    },
    "airline": {
        "regulator": "DGCA / AirSewa",
        "description": "Aviation complaints – flight cancellations, delays, refunds",
        "website": "https://airsewa.gov.in",
        "wait_days": 15,
        "path": ["Airline Helpdesk", "Nodal Officer", "AirSewa Portal", "DGCA"]
    },
    "ecommerce": {
        "regulator": "National Consumer Helpline (NCH)",
        "description": "E-commerce, refunds, defective products, delivery issues",
        "website": "https://consumerhelpline.gov.in",
        "wait_days": 7,
        "path": ["App Support", "Grievance Officer", "NCH Docket", "Consumer Court"]
    },
    "telecom": {
        "regulator": "TRAI / DoT",
        "description": "Telecom services – network, billing, portability",
        "website": "https://trai.gov.in", // Updated URL
        "wait_days": 30,
        "path": ["Customer Care", "Appellate Authority", "TRAI"]
    },
    "internet": {
        "regulator": "TRAI / DoT",
        "description": "Internet services – broadband, connectivity",
        "website": "https://trai.gov.in", // Updated URL
        "wait_days": 30,
        "path": ["Customer Care", "Appellate Authority", "TRAI"]
    },
    "insurance": {
        "regulator": "IRDAI (Bima Bharosa)",
        "description": "Insurance claims, policy disputes, mis-selling",
        "website": "https://bimabharosa.irdai.gov.in",
        "wait_days": 30,
        "path": ["Insurance Agent", "Grievance Officer", "Insurance Ombudsman"]
    },
    "realestate": {
        "regulator": "RERA",
        "description": "Real estate – project delays, possession issues",
        "website": "https://rera.delhi.gov.in",
        "wait_days": 60,
        "path": ["Developer", "RERA Conciliation", "RERA Bench"]
    },
    "travel": {
        "regulator": "DGCA / AirSewa",
        "description": "Travel and tourism complaints",
        "website": "https://airsewa.gov.in",
        "wait_days": 15,
        "path": ["Travel Agency", "Nodal Officer", "Consumer Court"]
    },
    "electronics": {
        "regulator": "National Consumer Helpline (NCH)",
        "description": "Electronic products, warranty, service issues",
        "website": "https://consumerhelpline.gov.in",
        "wait_days": 7,
        "path": ["Customer Support", "Grievance Officer", "NCH Docket", "Consumer Court"]
    },
    "food-delivery": {
        "regulator": "FSSAI / NCH",
        "description": "Food delivery, hygiene, order issues",
        "website": "https://foscos.fssai.gov.in",
        "wait_days": 0,
        "path": ["Restaurant/Platform", "NCH Docket", "FSSAI"]
    },
    "fintech": {
        "regulator": "RBI Ombudsman",
        "description": "Digital payments, fintech services",
        "website": "https://rbi.org.in/commonman/English/Scripts/Complaint.aspx",
        "wait_days": 30,
        "path": ["Customer Care", "Internal Nodal Officer", "RBI Ombudsman"]
    }
};

// Function to update authorityMap in a file
function updateFileAuthorityMap(filePath) {
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️ File not found: ${filePath}`);
        return false;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Find authorityMap declaration
    const mapRegex = /const\s+authorityMap\s*=\s*{[\s\S]*?};/;
    const match = content.match(mapRegex);

    if (match) {
        // Replace with corrected map
        const newMapString = 'const authorityMap = ' + JSON.stringify(correctedAuthorityMap, null, 4) + ';';
        content = content.replace(mapRegex, newMapString);
        modified = true;
        console.log(`✅ Updated authorityMap in ${filePath}`);
    } else {
        console.log(`❌ No authorityMap found in ${filePath}`);
    }

    // Also fix any hardcoded TRAI URLs
    const oldUrlRegex = /https:\/\/www\.tccms\.trai\.gov\.in/g;
    if (content.match(oldUrlRegex)) {
        content = content.replace(oldUrlRegex, 'https://trai.gov.in');
        modified = true;
        console.log(`  → Fixed TRAI URLs in ${filePath}`);
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        return true;
    }
    return false;
}

// Process all files
console.log('🔍 Scanning for authorityMap in files...\n');

let updatedCount = 0;
filesToCheck.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (updateFileAuthorityMap(filePath)) {
        updatedCount++;
    }
});

console.log(`\n📊 Summary: Updated ${updatedCount} files`);
console.log('✅ Authority map update complete!');