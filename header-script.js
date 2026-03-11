const fs = require('fs');
const path = require('path');

// List of HTML files to process (all .html files in current directory)
const files = fs.readdirSync(__dirname).filter(file => 
    file.endsWith('.html') && !file.includes('node_modules')
);

// The CSS block to ensure .nav-links has proper styling
const navLinksCSS = `
        .nav-links {
            display: flex;
            align-items: center;
            gap: 24px;
        }
        .nav-links a {
            white-space: nowrap;
        }
        @media (max-width: 768px) {
            .nav-links {
                gap: 12px;
            }
            .nav-links a {
                font-size: 0.85rem;
            }
        }`;

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Find the <style> section
    const styleRegex = /<style>([\s\S]*?)<\/style>/i;
    const styleMatch = content.match(styleRegex);
    
    if (styleMatch) {
        let styleContent = styleMatch[1];
        
        // Check if .nav-links already has flex properties
        if (!styleContent.includes('.nav-links') || 
            (!styleContent.includes('display: flex') && !styleContent.includes('display:flex'))) {
            
            // Insert the new CSS block into the style section
            // We'll place it before the closing </style>
            const updatedStyle = styleContent.replace(/(\s*)(<\/style>)/i, `${navLinksCSS}\n$1$2`);
            content = content.replace(styleRegex, `<style>${updatedStyle}</style>`);
            console.log(`✅ Updated CSS in ${file}`);
        } else {
            console.log(`⏩ .nav-links already has flex in ${file}`);
        }
    } else {
        // No <style> tag found – create one at the end of <head>
        const headCloseRegex = /<\/head>/i;
        if (headCloseRegex.test(content)) {
            const newStyle = `<style>\n${navLinksCSS}\n</style>\n`;
            content = content.replace(headCloseRegex, newStyle + '</head>');
            console.log(`✅ Added <style> to ${file}`);
        } else {
            console.log(`⚠️  No <head> found in ${file}`);
        }
    }

    // 2. Ensure the .nav-links div contains all links and no extra closing tags issues (basic check)
    // This is more complex; we assume the HTML structure is correct from previous updates.

    fs.writeFileSync(filePath, content, 'utf8');
});

console.log('🎉 Header alignment fix complete. Please review changes.');