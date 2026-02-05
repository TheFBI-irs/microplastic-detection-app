# Deployment Guide

This application is a static site that can be deployed to any static hosting service. Here are instructions for popular platforms:

## GitHub Pages

1. Build the project:
   ```bash
   npm run build
   ```

2. In your repository settings, go to Pages
3. Set source to `gh-pages` branch or `main` branch `/dist` folder
4. Or use GitHub Actions (see below)

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Netlify

1. Connect your repository to Netlify
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy!

Or use the Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

Or connect your GitHub repository directly in the Vercel dashboard.

## Important Notes

### Model Files

- Ensure your model files are in `public/models/` before building
- Model files will be included in the build output
- For large models, consider using a CDN and loading from there

### Environment Variables

If you need environment variables:
- Create `.env.production` for production builds
- Access via `import.meta.env.VITE_YOUR_VAR` in code

### CORS

If loading models from a different domain:
- Configure CORS headers on your model hosting
- Or host models on the same domain as the app

### Performance

- Enable compression on your hosting service
- Consider using a CDN for faster global delivery
- Optimize model size with quantization

