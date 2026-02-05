#!/bin/bash

# Deployment script for Microplastics Detection App
# This script helps prepare and deploy the application

set -e

echo "🌊 Microplastics Detection App - Deployment Script"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js version 16+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Build the project
echo ""
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ -d "dist" ]; then
    echo ""
    echo "✅ Build successful! Output directory: dist/"
    echo ""
    echo "📊 Build size:"
    du -sh dist/
    echo ""
    echo "🚀 Ready to deploy!"
    echo ""
    echo "Deployment options:"
    echo "  1. GitHub Pages: Push to main branch (auto-deploys via GitHub Actions)"
    echo "  2. Netlify:     netlify deploy --prod"
    echo "  3. Vercel:      vercel --prod"
    echo "  4. Preview:     npm run preview"
else
    echo "❌ Build failed! dist/ directory not found."
    exit 1
fi

