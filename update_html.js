const fs = require('fs');
const path = require('path');

// List of HTML files to update (add any missing ones)
const htmlFiles = [
    'about.html',
    'advisor.html',
    'airtel-complaint.html',
    'amazon-complaint.html',
    'bank-fraud-complaint.html',
    'builder-delay-complaint.html',
    'case.html',
    'complaint.html',
    'draft.html',
    'knowledge.html',
    'negotiation.html',
    'result.html',
    'search.html'
];

// The snippet to add inside the script block
const hidingScript = `
            // Hide header Home link on non-homepages
            if (window.location.pathname !== '/' && !window.location.pathname.endsWith('index.html')) {
                const homeLink = document.getElementById('header-home-link');
                if (homeLink) homeLink.style.display = 'none';
            }`;

htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
        console.log(`Skipping ${file} – not found`);
        return;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Add id to Home link
    content = content.replace(
        /<a href="index\.html">Home<\/a>/,
        '<a href="index.html" id="header-home-link">Home</a>'
    );

    // 2. Add Emergency link before Dashboard (or after Guide)
    // Look for the line containing "Guide" and insert Emergency after it
    const guideLinkRegex = /(<a href="knowledge\.html">Guide<\/a>)/;
    if (guideLinkRegex.test(content)) {
        content = content.replace(
            guideLinkRegex,
            '$1\n                <a href="emergency.html">Emergency</a>'
        );
    } else {
        console.log(`Warning: Guide link not found in ${file}, skipping Emergency link insertion.`);
    }

    // 3. Insert hiding script inside the then() block
    // Find the line with "supabase.auth.getSession().then(({ data: { session } }) => {"
    // Then after the if-else block, insert the hiding script before the closing }); of the then callback.
    const thenBlockRegex = /(supabase\.auth\.getSession\(\)\.then\(\(\{ data: \{ session \} \}\) => \{\s+if \(session\) \{[\s\S]+?\} else \{[\s\S]+?\}\s+?\}\);?)/;
    const match = content.match(thenBlockRegex);
    if (match) {
        const thenBlock = match[1];
        // Insert the hiding script right after the if-else block (before the closing }); )
        const updatedThenBlock = thenBlock.replace(
            /(\}\s+?\}\);?)$/,
            `${hidingScript}\n        $1`
        );
        content = content.replace(thenBlockRegex, updatedThenBlock);
    } else {
        console.log(`Warning: Could not find the then() block in ${file}. Script may need manual insertion.`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
});

console.log('All updates completed. Please verify changes.');