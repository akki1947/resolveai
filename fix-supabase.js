const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const supabaseConfig = {
  url: 'https://qdymteenojnjwgblxjas.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkeW10ZWVub2puandnYmx4amFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NTY5MTIsImV4cCI6MjA1NzIzMjkxMn0.9Yx8c8Pc8Pc8Pc8Pc8Pc8Pc8Pc8Pc8Pc8Pc8Pc8'
};

const canonicalAuthScript = `<script>
// ---------- SUPABASE AUTH ----------
const supabase = window.supabase.createClient(
    '${supabaseConfig.url}',
    '${supabaseConfig.anonKey}'
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
    
    if (window.location.pathname !== '/' && !window.location.pathname.endsWith('index.html')) {
        const homeLink = document.getElementById('header-home-link');
        if (homeLink) homeLink.style.display = 'none';
    }
});
</script>`;

function processHtmlFiles() {
    const files = fs.readdirSync(projectRoot).filter(f => f.endsWith('.html'));
    
    files.forEach(file => {
        const filePath = path.join(projectRoot, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;
        
        // Remove all existing supabase declarations
        const scriptRegex = /<script>[\s\S]*?<\/script>/gi;
        const scripts = content.match(scriptRegex) || [];
        
        scripts.forEach(script => {
            if (script.includes('supabase.createClient')) {
                content = content.replace(script, '');
                modified = true;
            }
        });
        
        // Add canonical auth script after header
        if (modified || !content.includes(canonicalAuthScript)) {
            const headerCloseIndex = content.indexOf('</header>');
            if (headerCloseIndex !== -1) {
                const insertPos = headerCloseIndex + 9;
                content = content.slice(0, insertPos) + '\n' + canonicalAuthScript + '\n' + content.slice(insertPos);
                fs.writeFileSync(filePath, content);
                console.log(`✅ Fixed: ${file}`);
            }
        }
    });
}

processHtmlFiles();