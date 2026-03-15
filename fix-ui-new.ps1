# fix-ui-new.ps1
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🔧 Fixing UI Issues" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Create backups
Write-Host ""
Write-Host "Creating backups..." -ForegroundColor Yellow
Copy-Item "advisor.html" "advisor.html.bak" -ErrorAction SilentlyContinue
Copy-Item "negotiation.html" "negotiation.html.bak" -ErrorAction SilentlyContinue
Copy-Item "search.html" "search.html.bak" -ErrorAction SilentlyContinue
Write-Host "Backups created" -ForegroundColor Green

# Fix advisor.html
Write-Host ""
Write-Host "Fixing advisor.html..." -ForegroundColor Yellow
$advisorContent = Get-Content "advisor.html" -Raw
$advisorContent = $advisorContent -replace '(?s)<style>.*?</style>', '<style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: "Inter", sans-serif; background: #f8fafc; color: #1e293b; min-height: 100vh; position: relative; padding-top: 20px; }
    .home-link { position: absolute; top: 20px; left: 20px; background: white; padding: 8px 16px; border-radius: 40px; font-weight: 500; font-size: 0.9rem; text-decoration: none; color: #2563eb; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.05); transition: all 0.2s; z-index: 100; }
    .home-link:hover { background: #f8fafc; transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
    header { background: white; border-bottom: 1px solid #e2e8f0; padding: 16px 0; margin-bottom: 30px; margin-top: 60px; }
    .header-content { max-width: 1100px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; }
    .logo { font-weight: 700; font-size: 1.5rem; color: #0f172a; text-decoration: none; }
    .logo span { color: #2563eb; }
    .nav-links { display: flex; align-items: center; gap: 24px; }
    .nav-links a { color: #475569; text-decoration: none; font-weight: 500; font-size: 0.95rem; }
    .nav-links a:hover { color: #2563eb; }
    @media (max-width: 768px) {
        .header-content { flex-direction: column; gap: 16px; }
        .nav-links { flex-wrap: wrap; justify-content: center; gap: 12px; }
        .home-link { position: static; display: inline-block; margin-bottom: 10px; }
        header { margin-top: 0; }
    }
    .container { max-width: 800px; margin: 0 auto; padding: 20px; }
    .advisor-header { text-align: center; margin-bottom: 32px; }
    .advisor-header h1 { font-size: 2.2rem; font-weight: 700; color: #0f172a; }
    .advisor-header h1 span { color: #2563eb; }
    .advisor-header .tagline { color: #475569; font-size: 1.1rem; margin-top: 8px; }
    .chat-box { background: white; border-radius: 32px; padding: 24px; box-shadow: 0 8px 20px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; margin-bottom: 24px; }
    .chat-history { height: 400px; overflow-y: auto; padding: 20px; background: #f8fafc; border-radius: 24px; margin-bottom: 20px; display: flex; flex-direction: column; gap: 16px; }
    .user-message { background: #2563eb; color: white; padding: 12px 18px; border-radius: 20px 20px 4px 20px; max-width: 80%; align-self: flex-end; margin-left: auto; word-wrap: break-word; }
    .ai-message { background: #f1f5f9; color: #1e293b; padding: 16px 20px; border-radius: 20px 20px 20px 4px; max-width: 90%; align-self: flex-start; border-left: 4px solid #2563eb; line-height: 1.6; word-wrap: break-word; }
    .ai-message p { margin-bottom: 8px; }
    .ai-message ul { margin-left: 24px; margin-bottom: 8px; }
    .input-area { display: flex; gap: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
    .input-area input { flex: 1; padding: 14px 18px; border: 1px solid #cbd5e1; border-radius: 40px; font-size: 1rem; outline: none; }
    .input-area input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
    .input-area button { background: #2563eb; color: white; border: none; padding: 14px 28px; border-radius: 40px; font-weight: 600; cursor: pointer; }
    .input-area button:hover { background: #1d4ed8; transform: translateY(-2px); }
    .examples { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; justify-content: center; }
    .examples span { background: #e2e8f0; color: #334155; padding: 8px 16px; border-radius: 40px; font-size: 0.9rem; cursor: pointer; }
    .examples span:hover { background: #cbd5e1; transform: translateY(-2px); }
    .footer { text-align: center; color: #94a3b8; font-size: 0.8rem; margin: 40px 0; }
    .typing-indicator { display: flex; gap: 4px; padding: 16px 20px; background: #f1f5f9; border-radius: 20px; width: fit-content; align-self: flex-start; }
    .typing-indicator span { width: 8px; height: 8px; background: #94a3b8; border-radius: 50%; animation: typing 1s infinite ease-in-out; }
    .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
    .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes typing { 0%,60%,100% { transform: translateY(0); } 30% { transform: translateY(-10px); } }
</style>'
Set-Content -Path "advisor.html" -Value $advisorContent -NoNewline
Write-Host "advisor.html updated" -ForegroundColor Green

# Fix negotiation.html (same CSS)
Write-Host ""
Write-Host "Fixing negotiation.html..." -ForegroundColor Yellow
$negContent = Get-Content "negotiation.html" -Raw
$negContent = $negContent -replace '(?s)<style>.*?</style>', '<style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: "Inter", sans-serif; background: #f8fafc; color: #1e293b; min-height: 100vh; position: relative; padding-top: 20px; }
    .home-link { position: absolute; top: 20px; left: 20px; background: white; padding: 8px 16px; border-radius: 40px; font-weight: 500; font-size: 0.9rem; text-decoration: none; color: #2563eb; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.05); transition: all 0.2s; z-index: 100; }
    .home-link:hover { background: #f8fafc; transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
    header { background: white; border-bottom: 1px solid #e2e8f0; padding: 16px 0; margin-bottom: 30px; margin-top: 60px; }
    .header-content { max-width: 1100px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; }
    .logo { font-weight: 700; font-size: 1.5rem; color: #0f172a; text-decoration: none; }
    .logo span { color: #2563eb; }
    .nav-links { display: flex; align-items: center; gap: 24px; }
    .nav-links a { color: #475569; text-decoration: none; font-weight: 500; font-size: 0.95rem; }
    .nav-links a:hover { color: #2563eb; }
    @media (max-width: 768px) {
        .header-content { flex-direction: column; gap: 16px; }
        .nav-links { flex-wrap: wrap; justify-content: center; gap: 12px; }
        .home-link { position: static; display: inline-block; margin-bottom: 10px; }
        header { margin-top: 0; }
    }
    .container { max-width: 800px; margin: 0 auto; padding: 20px; }
    .advisor-header { text-align: center; margin-bottom: 32px; }
    .advisor-header h1 { font-size: 2.2rem; font-weight: 700; color: #0f172a; }
    .advisor-header h1 span { color: #2563eb; }
    .advisor-header .tagline { color: #475569; font-size: 1.1rem; margin-top: 8px; }
    .chat-box { background: white; border-radius: 32px; padding: 24px; box-shadow: 0 8px 20px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; margin-bottom: 24px; }
    .chat-history { height: 400px; overflow-y: auto; padding: 20px; background: #f8fafc; border-radius: 24px; margin-bottom: 20px; display: flex; flex-direction: column; gap: 16px; }
    .user-message { background: #2563eb; color: white; padding: 12px 18px; border-radius: 20px 20px 4px 20px; max-width: 80%; align-self: flex-end; margin-left: auto; word-wrap: break-word; }
    .ai-message { background: #f1f5f9; color: #1e293b; padding: 16px 20px; border-radius: 20px 20px 20px 4px; max-width: 90%; align-self: flex-start; border-left: 4px solid #2563eb; line-height: 1.6; word-wrap: break-word; }
    .ai-message p { margin-bottom: 8px; }
    .ai-message ul { margin-left: 24px; margin-bottom: 8px; }
    .input-area { display: flex; gap: 12px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
    .input-area input { flex: 1; padding: 14px 18px; border: 1px solid #cbd5e1; border-radius: 40px; font-size: 1rem; outline: none; }
    .input-area input:focus { border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
    .input-area button { background: #2563eb; color: white; border: none; padding: 14px 28px; border-radius: 40px; font-weight: 600; cursor: pointer; }
    .input-area button:hover { background: #1d4ed8; transform: translateY(-2px); }
    .examples { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; justify-content: center; }
    .examples span { background: #e2e8f0; color: #334155; padding: 8px 16px; border-radius: 40px; font-size: 0.9rem; cursor: pointer; }
    .examples span:hover { background: #cbd5e1; transform: translateY(-2px); }
    .footer { text-align: center; color: #94a3b8; font-size: 0.8rem; margin: 40px 0; }
    .typing-indicator { display: flex; gap: 4px; padding: 16px 20px; background: #f1f5f9; border-radius: 20px; width: fit-content; align-self: flex-start; }
    .typing-indicator span { width: 8px; height: 8px; background: #94a3b8; border-radius: 50%; animation: typing 1s infinite ease-in-out; }
    .typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
    .typing-indicator span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes typing { 0%,60%,100% { transform: translateY(0); } 30% { transform: translateY(-10px); } }
</style>'
Set-Content -Path "negotiation.html" -Value $negContent -NoNewline
Write-Host "negotiation.html updated" -ForegroundColor Green

# Fix search.html
Write-Host ""
Write-Host "Fixing search.html..." -ForegroundColor Yellow
$searchContent = Get-Content "search.html" -Raw
$searchContent = $searchContent -replace '(?s)<style>.*?</style>', '<style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: "Inter", sans-serif; background: #f8fafc; color: #1e293b; line-height: 1.6; padding-top: 20px; position: relative; }
    .home-link { position: absolute; top: 20px; left: 20px; background: white; padding: 8px 16px; border-radius: 40px; font-weight: 500; font-size: 0.9rem; text-decoration: none; color: #2563eb; border: 1px solid #e2e8f0; box-shadow: 0 2px 4px rgba(0,0,0,0.05); transition: all 0.2s; z-index: 100; }
    .home-link:hover { background: #f8fafc; transform: translateY(-2px); box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
    header { background: white; border-bottom: 1px solid #e2e8f0; padding: 16px 0; margin-bottom: 30px; margin-top: 60px; }
    .header-content { max-width: 1100px; margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; }
    .logo { font-weight: 700; font-size: 1.5rem; color: #0f172a; text-decoration: none; }
    .logo span { color: #2563eb; }
    .nav-links { display: flex; align-items: center; gap: 24px; }
    .nav-links a { color: #475569; text-decoration: none; font-weight: 500; font-size: 0.95rem; }
    .nav-links a:hover { color: #2563eb; }
    @media (max-width: 768px) {
        .header-content { flex-direction: column; gap: 16px; }
        .nav-links { flex-wrap: wrap; justify-content: center; gap: 12px; }
        .home-link { position: static; display: inline-block; margin-bottom: 10px; }
        header { margin-top: 0; }
    }
    .container { max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { text-align: center; margin-bottom: 10px; font-size: 2.2rem; }
    .subhead { text-align: center; color: #64748b; margin-bottom: 30px; }
    .search-box { display: flex; gap: 10px; margin-bottom: 30px; max-width: 600px; margin-left: auto; margin-right: auto; }
    .search-input { flex: 1; padding: 15px 20px; border: 2px solid #e2e8f0; border-radius: 50px; font-size: 1rem; }
    .search-input:focus { border-color: #2563eb; outline: none; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
    .search-button { padding: 15px 30px; background: #2563eb; color: white; border: none; border-radius: 50px; font-weight: 600; cursor: pointer; }
    .search-button:hover { background: #1d4ed8; }
    .filters { display: flex; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; justify-content: center; }
    .filter-chip { background: white; border: 1px solid #e2e8f0; border-radius: 40px; padding: 8px 16px; cursor: pointer; }
    .filter-chip:hover { border-color: #2563eb; background: #f0f9ff; }
    .filter-chip.active { background: #2563eb; color: white; border-color: #2563eb; }
    .results-container { display: flex; flex-direction: column; gap: 15px; }
    .result-card { background: white; border-radius: 12px; padding: 20px; border: 1px solid #e2e8f0; cursor: pointer; }
    .result-card:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(0,0,0,0.1); border-color: #2563eb; }
    .result-title { font-size: 1.2rem; font-weight: 600; color: #2563eb; margin-bottom: 8px; }
    .result-meta { display: flex; gap: 20px; color: #64748b; font-size: 0.9rem; margin-bottom: 10px; flex-wrap: wrap; }
    .result-description { color: #475569; margin-bottom: 15px; }
    .result-actions { display: flex; gap: 10px; }
    .action-btn { padding: 8px 16px; border-radius: 40px; text-decoration: none; font-size: 0.9rem; font-weight: 500; background: #f1f5f9; color: #1e293b; border: none; cursor: pointer; }
    .action-btn.primary { background: #2563eb; color: white; }
    .action-btn:hover { background: #e2e8f0; }
    .action-btn.primary:hover { background: #1d4ed8; }
    .no-results { text-align: center; padding: 40px; color: #64748b; }
    .loading { text-align: center; padding: 40px; color: #64748b; }
    .footer { text-align: center; color: #94a3b8; font-size: 0.8rem; margin-top: 40px; padding: 20px; border-top: 1px solid #e2e8f0; }
</style>'
Set-Content -Path "search.html" -Value $searchContent -NoNewline
Write-Host "search.html updated" -ForegroundColor Green

# Summary
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ All UI fixes applied successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Files updated:" -ForegroundColor Yellow
Write-Host "  - advisor.html"
Write-Host "  - negotiation.html"
Write-Host "  - search.html"
Write-Host ""
Write-Host "Backups created:" -ForegroundColor Yellow
Write-Host "  - advisor.html.bak"
Write-Host "  - negotiation.html.bak"
Write-Host "  - search.html.bak"
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Test locally: python -m http.server 8000"
Write-Host "2. Open http://localhost:8000/advisor.html"
Write-Host "3. Verify fixes look good"
Write-Host "4. Commit and push:"
Write-Host "   git add advisor.html negotiation.html search.html"
Write-Host "   git commit -m 'Fix: UI alignment issues'"
Write-Host "   git push origin main"