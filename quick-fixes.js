const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 Starting comprehensive fixes for ResolveAI...\n');

// Step 1: Update authority maps
console.log('📌 Step 1: Updating authority maps...');
try {
    require('./update-authoritymap.js');
    console.log('✅ Authority maps updated\n');
} catch (error) {
    console.error('❌ Failed to update authority maps:', error.message);
}

// Step 2: Disable public links
console.log('📌 Step 2: Disabling public case links...');
try {
    require('./disable-public-links.js');
    console.log('✅ Public links disabled\n');
} catch (error) {
    console.error('❌ Failed to disable public links:', error.message);
}

// Step 3: Update headers with centralized auth
console.log('📌 Step 3: Updating headers with centralized auth...');
try {
    require('./update-header-auth.js');
    console.log('✅ Headers updated\n');
} catch (error) {
    console.error('❌ Failed to update headers:', error.message);
}

// Step 4: Verify Supabase config
console.log('📌 Step 4: Verifying Supabase configuration...');
try {
    const configExists = fs.existsSync('./js/config.js');
    const authExists = fs.existsSync('./js/auth.js');
    
    if (configExists && authExists) {
        console.log('✅ Config and auth files present');
    } else {
        console.log('⚠️ Missing files:', 
            !configExists ? 'config.js ' : '',
            !authExists ? 'auth.js' : ''
        );
    }
} catch (error) {
    console.error('❌ Verification failed:', error.message);
}

console.log('\n🎉 All fixes applied! Please test your site thoroughly.');
console.log('📝 Next steps:');
console.log('   1. Run `git status` to see changes');
console.log('   2. Test login/signup functionality');
console.log('   3. Test search with various queries');
console.log('   4. Verify TRAI links work correctly');
console.log('   5. Commit and push changes');