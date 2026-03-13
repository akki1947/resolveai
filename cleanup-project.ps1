# cleanup-project.ps1
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🧹 Cleaning up ResolveAI Project" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Step 1: Remove all backup files
Write-Host "`n📌 Step 1: Removing backup files..." -ForegroundColor Yellow
$backupFiles = Get-ChildItem -Path . -Filter "*.backup-*" -File
if ($backupFiles.Count -gt 0) {
    $backupFiles | ForEach-Object { 
        Remove-Item $_.FullName -Force
        Write-Host "  ✅ Removed: $($_.Name)" -ForegroundColor Green
    }
} else {
    Write-Host "  ⏭️ No backup files found" -ForegroundColor Gray
}

# Step 2: Remove minimal test files
Write-Host "`n📌 Step 2: Removing minimal test files..." -ForegroundColor Yellow
$minimalFiles = @(
    "advisor-minimal.html",
    "negotiation-minimal.html", 
    "search-minimal.html",
    "draft-minimal.html"
)
foreach ($file in $minimalFiles) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "  ✅ Removed: $file" -ForegroundColor Green
    } else {
        Write-Host "  ⏭️ $file not found" -ForegroundColor Gray
    }
}

# Step 3: Remove fix scripts
Write-Host "`n📌 Step 3: Removing fix scripts..." -ForegroundColor Yellow
$fixScripts = @(
    "complete-quick-fix.js",
    "fix-all-issues.js", 
    "final-fix.js",
    "fix-header.js",
    "update-authoritymap.js",
    "disable-public-links.js",
    "update-header-auth.js",
    "remove-supabase-and-fix.js",
    "add-unified.js",
    "quick-fixes.js"
)
foreach ($script in $fixScripts) {
    if (Test-Path $script) {
        Remove-Item $script -Force
        Write-Host "  ✅ Removed: $script" -ForegroundColor Green
    } else {
        Write-Host "  ⏭️ $script not found" -ForegroundColor Gray
    }
}

# Step 4: Clean up API middleware (if we're moving away from APIs)
Write-Host "`n📌 Step 4: Cleaning up API folder..." -ForegroundColor Yellow
$apiFiles = @(
    "api\middleware\rate-limit.js",
    "api\middleware\ai-summary.js",
    "api\get-complaint.js",
    "api\get-user-complaints.js",
    "api\negotiate.js",
    "api\save-complaint.js",
    "api\suggest-authority.js",
    "api\test.js"
)

# Ask user before deleting API files
$response = Read-Host "`nDo you want to remove API files? (y/n)"
if ($response -eq 'y') {
    foreach ($file in $apiFiles) {
        if (Test-Path $file) {
            Remove-Item $file -Force
            Write-Host "  ✅ Removed: $file" -ForegroundColor Green
        }
    }
    # Remove middleware folder if empty
    if (Test-Path "api\middleware") {
        $middlewareFiles = Get-ChildItem "api\middleware" -File
        if ($middlewareFiles.Count -eq 0) {
            Remove-Item "api\middleware" -Force
            Write-Host "  ✅ Removed empty middleware folder" -ForegroundColor Green
        }
    }
} else {
    Write-Host "  ⏭️ Skipping API cleanup" -ForegroundColor Gray
}

# Step 5: Remove duplicate JSON files
Write-Host "`n📌 Step 5: Checking data folder..." -ForegroundColor Yellow
if (Test-Path "data\complaint-categories.json" -and Test-Path "data\grievance-categories.json") {
    Write-Host "  ℹ️ Both complaint-categories.json and grievance-categories.json exist" -ForegroundColor Gray
    $response = Read-Host "  Do you want to keep grievance-categories.json only? (y/n)"
    if ($response -eq 'y') {
        Remove-Item "data\complaint-categories.json" -Force
        Write-Host "  ✅ Removed complaint-categories.json" -ForegroundColor Green
    }
}

# Step 6: Remove empty directories
Write-Host "`n📌 Step 6: Removing empty directories..." -ForegroundColor Yellow
$directories = @("backup-20260313", "css")
foreach ($dir in $directories) {
    if (Test-Path $dir) {
        $files = Get-ChildItem $dir -File
        if ($files.Count -eq 0) {
            Remove-Item $dir -Force
            Write-Host "  ✅ Removed empty directory: $dir" -ForegroundColor Green
        } else {
            Write-Host "  ⏭️ Directory not empty: $dir" -ForegroundColor Gray
        }
    }
}

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "✅ Cleanup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "`n📂 Remaining important files:" -ForegroundColor Yellow
Write-Host "  📁 data/ - Your database files" -ForegroundColor White
Write-Host "  📁 js/ - JavaScript files" -ForegroundColor White
Get-ChildItem -Path *.html | ForEach-Object { Write-Host "  📄 $($_.Name)" -ForegroundColor White }

Write-Host "`n🚀 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Review remaining files" -ForegroundColor White
Write-Host "  2. Test your main pages" -ForegroundColor White
Write-Host "  3. Commit clean state" -ForegroundColor White