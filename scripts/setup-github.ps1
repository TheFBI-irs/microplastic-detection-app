# PowerShell script to set up GitHub deployment
# This script helps you connect your local repo to GitHub and deploy

Write-Host "GitHub Deployment Setup" -ForegroundColor Cyan
Write-Host "=======================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in a git repo
if (-not (Test-Path ".git")) {
    Write-Host "Not a git repository. Run git init first." -ForegroundColor Red
    exit 1
}

# Check current branch
$currentBranch = git branch --show-current
Write-Host "Current branch: $currentBranch" -ForegroundColor Yellow
Write-Host ""

# Check if remote exists
$remote = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "No GitHub remote configured yet." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To set up GitHub deployment:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Create a new repository on GitHub:" -ForegroundColor White
    Write-Host "   Go to: https://github.com/new" -ForegroundColor Gray
    Write-Host "   Name it: microplastic-detection-app (or your choice)" -ForegroundColor Gray
    Write-Host "   Do not initialize with README/license" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Copy the repository URL (HTTPS or SSH)" -ForegroundColor White
    Write-Host ""
    Write-Host "3. Run this command (replace with your URL):" -ForegroundColor White
    Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git" -ForegroundColor Green
    Write-Host ""
    Write-Host "4. Push your code:" -ForegroundColor White
    Write-Host "   git push -u origin $currentBranch" -ForegroundColor Green
    Write-Host ""
    Write-Host "5. Enable GitHub Pages:" -ForegroundColor White
    Write-Host "   Go to repo Settings, then Pages" -ForegroundColor Gray
    Write-Host "   Source: Select GitHub Actions" -ForegroundColor Gray
    Write-Host "   The workflow will auto-deploy!" -ForegroundColor Gray
    Write-Host ""
} else {
    Write-Host "Remote already configured: $remote" -ForegroundColor Green
    Write-Host ""
    Write-Host "To push and deploy:" -ForegroundColor Cyan
    Write-Host "  git push -u origin $currentBranch" -ForegroundColor Green
    Write-Host ""
    Write-Host "Then enable GitHub Pages in repo settings:" -ForegroundColor Cyan
    Write-Host "  Settings, then Pages, then Source: GitHub Actions" -ForegroundColor Gray
}

Write-Host ""
Write-Host "Tip: The GitHub Actions workflow supports both main and master branches" -ForegroundColor Yellow
