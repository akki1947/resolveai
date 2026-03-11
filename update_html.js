const fs = require('fs');
const path = require('path');

// List of HTML files to update (add any missing ones)
const htmlFiles = [
    'index.html',
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
    'search.html',
    'emergency.html' // if exists
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

    // 0. Remove the floating "← Home" link (any line with class="home-link")
    // This regex matches a line containing <a ... class="home-link" ...>
    content = content.replace(/^\s*<a[^>]*class="home-link"[^>]*>.*<\/a>\s*$/gm, '');

    // 1. Add id to header Home link
    content = content.replace(
        /<a href="index\.html">Home<\/a>/,
        '<a href="index.html" id="header-home-link">Home</a>'
    );

    // 2. Add Emergency link before Dashboard (or after Guide)
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
    const thenBlockRegex = /(supabase\.auth\.getSession\(\)\.then\(\(\{ data: \{ session \} \}\) => \{\s+if \(session\) \{[\s\S]+?\} else \{[\s\S]+?\}\s+?\}\);?)/;
    const match = content.match(thenBlockRegex);
    if (match) {
        const thenBlock = match[1];
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