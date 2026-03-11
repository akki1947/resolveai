const fs = require('fs');
const path = require('path');

// Get all .html files in the current directory (excluding node_modules)
const files = fs.readdirSync(__dirname).filter(file => 
    file.endsWith('.html') && !file.includes('node_modules')
);

// Canonical navigation links to replace inside .nav-links
const canonicalNavLinks = `
            <a href="index.html" id="header-home-link">Home</a>
            <a href="search.html">Search</a>
            <a href="advisor.html">AI Advisor</a>
            <a href="negotiation.html">AI Negotiator</a>
            <a href="knowledge.html">Guide</a>
            <a href="emergency.html">Emergency</a>
            <a href="dashboard.html" id="dashboard-link" style="display:none;">Dashboard</a>
            <a href="#" id="logout-link" onclick="logout()" style="display:none;">Logout</a>
            <a href="login.html" id="login-link">Login</a>`;

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Remove any floating "← Home" link (line with class="home-link")
    content = content.replace(/^\s*<a[^>]*class="home-link"[^>]*>.*<\/a>\s*$/gm, '');

    // 2. Replace the content inside .nav-links with the canonical version
    // This regex matches <div class="nav-links"> ... </div> and captures the inner content
    const navLinksRegex = /(<div class="nav-links">)([\s\S]*?)(<\/div>)/;
    if (navLinksRegex.test(content)) {
        content = content.replace(navLinksRegex, `$1${canonicalNavLinks}$3`);
        console.log(`✅ Updated navigation in ${file}`);
    } else {
        console.log(`⚠️  Could not find .nav-links in ${file}`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log('🎉 All files processed. Please verify changes, especially emergency.html and result.html.');