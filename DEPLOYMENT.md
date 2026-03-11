# Deployment Guide

This application is a static site that can be deployed to GitHub Pages, Netlify, Vercel, or any static host. Inference runs via Roboflow's Hosted API — no model files are bundled.

## Required Environment Variables

Set these at **build time** (Vite embeds them via `import.meta.env`):

| Variable | Description |
|----------|-------------|
| `VITE_ROBOFLOW_API_KEY` | Your Roboflow API key from [roboflow.com/account/api](https://roboflow.com/account/api) |
| `VITE_ROBOFLOW_MODEL_ID` | Model ID (format: `workspace/model-name/version`) |

These are the same variables used locally in `.env`. Configure them in your platform's environment/build settings.

## GitHub Pages

1. Build the project with env vars set:
   ```bash
   VITE_ROBOFLOW_API_KEY=your_key VITE_ROBOFLOW_MODEL_ID=workspace/model/21 npm run build
   ```

2. In repository settings → Pages, set source to `gh-pages` branch or `main` branch `/dist` folder.

3. **GitHub Actions**: If using Actions, add the env vars as repository secrets (`ROBOFLOW_API_KEY`, `ROBOFLOW_MODEL_ID`) and pass them into the build step. Update `.github/workflows/deploy.yml` to include:
   ```yaml
   env:
     VITE_ROBOFLOW_API_KEY: ${{ secrets.VITE_ROBOFLOW_API_KEY }}
     VITE_ROBOFLOW_MODEL_ID: ${{ secrets.VITE_ROBOFLOW_MODEL_ID }}
   ```
   (Ensure these secrets exist in the repo settings.)

## Netlify

1. Connect your repository to Netlify.
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Environment variables: In Site settings → Environment variables, add `VITE_ROBOFLOW_API_KEY` and `VITE_ROBOFLOW_MODEL_ID`.
4. Deploy.

Or with Netlify CLI:
```bash
netlify deploy --prod
```
Configure env vars in the Netlify dashboard for the site.

## Vercel

1. Connect your repository in the Vercel dashboard.
2. Add `VITE_ROBOFLOW_API_KEY` and `VITE_ROBOFLOW_MODEL_ID` under Project Settings → Environment Variables.
3. Build and deploy (Vercel auto-detects Vite).

Or with Vercel CLI:
```bash
vercel --prod
```
Set env vars in the project settings on vercel.com.

## Notes

- **Build-time only**: Values are baked in at build; no server-side env loading.
- **No model files**: Inference is via Roboflow API; nothing to host locally.
- **CORS**: Roboflow API supports browser requests; no extra CORS setup needed from the app side.
