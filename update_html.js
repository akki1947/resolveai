const fs = require('fs');
const path = require('path');

// Path to your emergency data file
const DATA_FILE = path.join(__dirname, 'data', 'emergencyData.json');

// Read the JSON file
try {
    console.log('📂 Reading emergencyData.json...');
    const rawData = fs.readFileSync(DATA_FILE, 'utf8');
    const data = JSON.parse(rawData);
    
    console.log(`✅ Found ${data.states.length} states\n`);
    
    let addedCount = 0;
    let alreadyHadCount = 0;
    
    // Add "unified": "112" to each state if missing
    data.states.forEach(state => {
        if (!state.emergency_numbers.unified) {
            state.emergency_numbers.unified = "112";
            addedCount++;
            console.log(`  ➕ Added unified:112 to ${state.state}`);
        } else {
            alreadyHadCount++;
            console.log(`  ✓ ${state.state} already has unified: ${state.emergency_numbers.unified}`);
        }
    });
    
    // Write back the updated JSON
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
    
    console.log(`\n📊 Summary:`);
    console.log(`   - States processed: ${data.states.length}`);
    console.log(`   - Added unified:112 to: ${addedCount} states`);
    console.log(`   - Already had unified: ${alreadyHadCount} states`);
    console.log(`\n✅ Successfully updated ${DATA_FILE}`);
    
} catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\nPlease check:');
    console.log('1. The file exists at: data/emergencyData.json');
    console.log('2. The JSON is valid (no syntax errors)');
    console.log('3. You have read/write permissions');
}