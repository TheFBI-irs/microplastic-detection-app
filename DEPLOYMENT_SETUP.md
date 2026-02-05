# Quick Deployment Setup Guide

This guide will help you deploy the Microplastics Detection App to various platforms.

## Prerequisites

1. **Install dependencies locally first:**
   ```bash
   npm install
   ```

2. **Test the build:**
   ```bash
   npm run build
   ```

3. **Preview locally:**
   ```bash
   npm run preview
   ```

## Deployment Options

### Option 1: GitHub Pages (Recommended - Free & Easy)

**Automatic Deployment (via GitHub Actions):**

1. Push your code to a GitHub repository
2. Go to repository Settings → Pages
3. Set source to "GitHub Actions"
4. The workflow in `.github/workflows/deploy.yml` will automatically deploy on every push to `main` branch

**Manual Deployment:**

1. Build the project: `npm run build`
2. Push the `dist/` folder to `gh-pages` branch:
   ```bash
   git subtree push --prefix dist origin gh-pages
   ```

**Note:** If deploying to a subdirectory (e.g., `username.github.io/repo-name`), set the base path:
```bash
VITE_BASE_PATH=/repo-name/ npm run build
```

### Option 2: Netlify (Easiest - Drag & Drop)

**Method 1: Netlify Dashboard (No CLI needed)**
1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Drag and drop your `dist/` folder onto the Netlify dashboard
3. Done! Your site is live

**Method 2: Netlify CLI**
```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
npm run deploy:netlify
```

**Method 3: Connect GitHub Repository**
1. Go to Netlify dashboard
2. Click "New site from Git"
3. Connect your GitHub repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Deploy!

### Option 3: Vercel (Great for React Apps)

**Method 1: Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Vercel auto-detects Vite settings
5. Deploy!

**Method 2: Vercel CLI**
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login
vercel login

# Deploy
npm run deploy:vercel
```

### Option 4: Other Static Hosts

The `dist/` folder can be deployed to any static hosting service:
- **Firebase Hosting**
- **AWS S3 + CloudFront**
- **Azure Static Web Apps**
- **Cloudflare Pages**
- **Surge.sh**

Just upload the contents of the `dist/` folder to your hosting service.

## Using the Deployment Scripts

### Windows (PowerShell)
```powershell
.\scripts\deploy.ps1
```

### Mac/Linux (Bash)
```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

## Environment Variables

If you need environment variables for different environments:

1. Create `.env.production` for production builds
2. Access in code: `import.meta.env.VITE_YOUR_VAR`
3. Add to your hosting platform's environment variables

## Important Notes

### Model Files
- Ensure your TensorFlow.js model files are in `public/models/` before building
- Model files will be included in the build
- For large models, consider hosting separately and loading from CDN

### Base Path
- For root domain: Use default (no base path needed)
- For subdirectory: Set `VITE_BASE_PATH=/your-path/` before building

### CORS
- If loading models from different domain, configure CORS headers
- Or host models on same domain as the app

## Troubleshooting

### Build Fails
- Check Node.js version (16+ required)
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript/ESLint errors

### Deployment Fails
- Verify build completes locally first
- Check hosting platform logs
- Ensure all files in `dist/` are uploaded

### Model Not Loading After Deployment
- Check model file paths are correct
- Verify model files are in `dist/models/` after build
- Check browser console for 404 errors

## Quick Commands Reference

```bash
# Development
npm run dev

# Build
npm run build

# Preview build locally
npm run preview

# Deploy (builds first)
npm run deploy

# Deploy to Netlify
npm run deploy:netlify

# Deploy to Vercel
npm run deploy:vercel
```

## Next Steps After Deployment

1. Test your deployed site
2. Verify model loading works
3. Test on mobile devices
4. Share your deployment URL!

