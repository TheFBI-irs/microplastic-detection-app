# GitHub Deployment - Quick Guide

## Current Status
- ✅ You're on the `master` branch
- ✅ All files are committed
- ⏳ Need to add GitHub remote

## Step-by-Step Deployment

### 1. Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `microplastic-detection-app` (or your choice)
3. **Important:** Do NOT check "Add a README file" or any other initialization
4. Click "Create repository"

### 2. Connect Your Local Repo

After creating the repo, GitHub will show you commands. Use these:

```powershell
# Add the remote (replace with YOUR repository URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push your code
git push -u origin master
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**, select **"GitHub Actions"**
5. Save

### 4. Automatic Deployment

Once you push to the `master` branch, the GitHub Actions workflow (`.github/workflows/deploy.yml`) will automatically:
- Build your app
- Deploy to GitHub Pages
- Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME`

## Quick Commands

```powershell
# Check current status
git status

# Check remote (after adding)
git remote -v

# Push updates (after initial setup)
git add .
git commit -m "Your commit message"
git push
```

## Troubleshooting

### "Remote already exists"
If you get an error that remote already exists:
```powershell
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

### Want to use `main` instead of `master`?
```powershell
git branch -M main
git push -u origin main
```
The workflow supports both branches.

### Check deployment status
- Go to your repo → **Actions** tab
- You'll see the deployment workflow running
- Click on it to see build logs

## Need Help?

Run the setup script:
```powershell
powershell -ExecutionPolicy Bypass -File scripts/setup-github.ps1
```

