# PowerShell deployment script for Microplastics Detection App
# This script helps prepare and deploy the application on Windows

Write-Host "🌊 Microplastics Detection App - Deployment Script" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js 16+ first." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

# Build the project
Write-Host ""
Write-Host "🔨 Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

# Check if build was successful
if (Test-Path "dist") {
    Write-Host ""
    Write-Host "✅ Build successful! Output directory: dist/" -ForegroundColor Green
    Write-Host ""
    
    # Get build size
    $distSize = (Get-ChildItem -Path "dist" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "📊 Build size: $([math]::Round($distSize, 2)) MB" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "🚀 Ready to deploy!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Deployment options:" -ForegroundColor Yellow
    Write-Host "  1. GitHub Pages: Push to main branch (auto-deploys via GitHub Actions)"
    Write-Host "  2. Netlify:     netlify deploy --prod"
    Write-Host "  3. Vercel:      vercel --prod"
    Write-Host "  4. Preview:     npm run preview"
} else {
    Write-Host "❌ Build failed! dist/ directory not found." -ForegroundColor Red
    exit 1
}

