const fs = require('fs');
const path = require('path');

// Configuration
const PROJECT_ROOT = __dirname; // Current directory
const SUPABASE_URL = 'https://qdymteenojnjwgblxjas.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeW10ZWVub2puandnYmx4amFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NTY5MTIsImV4cCI6MjA1NzIzMjkxMn0.9Yx8c8Pc8Pc8Pc8Pc8Pc8Pc8Pc8Pc8Pc8Pc8Pc8';

// Files to exclude (node_modules, etc.)
const excludeFiles = [
    'node_modules',
    'update_html.js',
    'package-lock.json',
    'package.json',
    '.git'
];

// Get all HTML files recursively
function getAllHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        // Skip excluded files/folders
        if (excludeFiles.some(exclude => filePath.includes(exclude))) {
            return;
        }
        
        if (stat.isDirectory()) {
            getAllHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });
    
    return fileList;
}

// Extract script blocks from HTML
function extractScriptBlocks(content) {
    const scriptRegex = /<script>([\s\S]*?)<\/script>/gi;
    const scripts = [];
    let match;
    
    while ((match = scriptRegex.exec(content)) !== null) {
        scripts.push({
            full: match[0],
            content: match[1],
            index: match.index
        });
    }
    
    return scripts;
}

// Check if script contains supabase declaration
function hasSupabaseDeclaration(scriptContent) {
    return scriptContent.includes('const supabase =') || 
           scriptContent.includes('let supabase =') ||
           scriptContent.includes('var supabase =');
}

// Generate the canonical auth script block
function generateAuthScript() {
    return `<script>
        // ---------- SUPABASE AUTH ----------
        const supabase = window.supabase.createClient(
            '${SUPABASE_URL}',
            '${SUPABASE_ANON_KEY}'
        );

        async function logout() {
            await supabase.auth.signOut();
            window.location.href = 'index.html';
        }

        supabase.auth.getSession().then(({ data: { session } }) => {
            const loginLink = document.getElementById('login-link');
            const logoutLink = document.getElementById('logout-link');
            const dashboardLink = document.getElementById('dashboard-link');
            
            if (session) {
                if (loginLink) loginLink.style.display = 'none';
                if (logoutLink) logoutLink.style.display = 'inline';
                if (dashboardLink) dashboardLink.style.display = 'inline';
            } else {
                if (loginLink) loginLink.style.display = 'inline';
                if (logoutLink) logoutLink.style.display = 'none';
                if (dashboardLink) dashboardLink.style.display = 'none';
            }
            
            // Hide header Home link on non-homepages
            if (window.location.pathname !== '/' && !window.location.pathname.endsWith('index.html')) {
                const homeLink = document.getElementById('header-home-link');
                if (homeLink) homeLink.style.display = 'none';
            }
        });
    </script>`;
}

// Process a single HTML file
function processHtmlFile(filePath) {
    console.log(`Processing: ${filePath}`);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Extract all script blocks
    const scripts = extractScriptBlocks(content);
    
    // Find scripts that declare supabase
    const supabaseScripts = scripts.filter(script => 
        hasSupabaseDeclaration(script.content)
    );
    
    // If no supabase declaration, add it after header
    if (supabaseScripts.length === 0) {
        console.log(`  → No supabase declaration found, adding auth script`);
        // Find position after header
        const headerCloseIndex = content.indexOf('</header>');
        if (headerCloseIndex !== -1) {
            const insertPos = headerCloseIndex + 9; // after </header>
            content = content.slice(0, insertPos) + '\n\n' + generateAuthScript() + '\n\n' + content.slice(insertPos);
            modified = true;
        }
    } 
    // If multiple declarations, keep only the first and remove others
    else if (supabaseScripts.length > 1) {
        console.log(`  → Found ${supabaseScripts.length} supabase declarations, cleaning up...`);
        
        // Keep the first script, remove supabase declarations from others
        const firstScript = supabaseScripts[0];
        
        // Process from last to first to avoid index shifting
        for (let i = supabaseScripts.length - 1; i > 0; i--) {
            const script = supabaseScripts[i];
            
            // Remove the entire script block if it only contains supabase stuff
            // But if it has other code, we need to remove just the declaration
            const otherCode = script.content.replace(/const supabase =[^;]+;|let supabase =[^;]+;|var supabase =[^;]+;/g, '');
            
            if (otherCode.trim().length === 0) {
                // Script only had supabase declaration, remove entire block
                content = content.replace(script.full, '');
                console.log(`    Removed empty script block at index ${i}`);
            } else {
                // Keep the script but remove the supabase declaration line
                const cleanedScript = script.full.replace(
                    /const supabase =[^;]+;|let supabase =[^;]+;|var supabase =[^;]+;/g, 
                    ''
                ).replace(/\n\s*\n/g, '\n'); // Remove extra blank lines
                content = content.replace(script.full, cleanedScript);
                console.log(`    Removed supabase declaration from script ${i}, kept other code`);
            }
            modified = true;
        }
    } else {
        console.log(`  → Already has single supabase declaration, checking if it matches canonical version...`);
        
        // Optional: Update to canonical version if it's different
        const existingScript = supabaseScripts[0];
        
        // Simple check - if it doesn't have the logout function or has extra declarations, replace it
        if (!existingScript.content.includes('async function logout') || 
            existingScript.content.includes('const supabase =') && existingScript.content.split('const supabase =').length > 2) {
            
            console.log(`    Replacing with canonical auth script`);
            const newContent = content.replace(existingScript.full, generateAuthScript());
            content = newContent;
            modified = true;
        }
    }
    
    // Write back if modified
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  ✅ Updated: ${filePath}`);
    } else {
        console.log(`  ✓ No changes needed`);
    }
    
    return modified;
}

// Main function
function main() {
    console.log('🔍 Scanning for HTML files...\n');
    
    const htmlFiles = getAllHtmlFiles(PROJECT_ROOT);
    console.log(`Found ${htmlFiles.length} HTML files\n`);
    
    let modifiedCount = 0;
    let errorCount = 0;
    
    htmlFiles.forEach(filePath => {
        try {
            const modified = processHtmlFile(filePath);
            if (modified) modifiedCount++;
        } catch (error) {
            console.error(`❌ Error processing ${filePath}:`, error.message);
            errorCount++;
        }
    });
    
    console.log('\n📊 Summary:');
    console.log(`   Total files: ${htmlFiles.length}`);
    console.log(`   Modified: ${modifiedCount}`);
    console.log(`   Errors: ${errorCount}`);
    console.log(`   Unchanged: ${htmlFiles.length - modifiedCount - errorCount}`);
    
    if (modifiedCount > 0) {
        console.log('\n✅ Done! Please review changes and test your site.');
        console.log('   Run `git diff` to see what changed.');
    } else {
        console.log('\n✨ All files already have single supabase declarations!');
    }
}

// Run the script
main();