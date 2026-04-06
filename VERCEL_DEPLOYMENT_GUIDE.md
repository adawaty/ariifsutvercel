# ARIIF - Vercel Deployment Guide

This guide will help you deploy the ARIIF Angular application to Vercel.

## Project Information

- **Project Name:** ARIIF
- **Framework:** Angular 21
- **Repository:** https://github.com/adawaty/ariifsutvercel
- **Build Command:** `npm run build`
- **Output Directory:** `dist/ariif/browser`

## Prerequisites

1. A Vercel account (sign up at https://vercel.com if you don't have one)
2. GitHub account with access to the repository
3. Git installed locally

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Sign in with your account

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select "Import Git Repository"
   - Search for and select `adawaty/ariifsutvercel`
   - Click "Import"

3. **Configure Project**
   - **Project Name:** Keep as `ariifsutvercel` or customize
   - **Framework Preset:** Select "Angular" (if available) or leave as "Other"
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/ariif/browser`
   - **Install Command:** `npm install`
   - **Environment Variables:** Leave empty (unless you have specific env vars needed)

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete
   - Once deployed, you'll receive a unique URL for your application

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Project Directory**
   ```bash
   cd /path/to/ariif-project
   vercel
   ```

4. **Follow the Prompts**
   - Confirm project settings
   - Set build command: `npm run build`
   - Set output directory: `dist/ariif/browser`
   - Deploy

### Option 3: Automatic Deployment with GitHub Integration

1. **Connect GitHub to Vercel**
   - In Vercel Dashboard, go to Settings → Git Integration
   - Connect your GitHub account

2. **Auto-Deploy on Push**
   - Once connected, any push to the `master` branch will automatically trigger a deployment
   - Vercel will build and deploy automatically

## Configuration Files

The following files have been added to support Vercel deployment:

### `vercel.json`
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist/ariif/browser",
  "framework": "angular",
  "env": {
    "ENABLE_FILE_SYSTEM_API": "1"
  }
}
```

### `.vercelignore`
Excludes unnecessary files from deployment to reduce build time and size.

## Troubleshooting

### Build Fails with "Command not found"
- Ensure `package.json` has the correct scripts
- Check that all dependencies are properly listed

### Build Timeout
- Angular builds can take time; Vercel's default timeout is usually sufficient
- If needed, you can increase timeout in project settings

### Application Shows 404
- Verify the output directory is correct: `dist/ariif/browser`
- Check that `index.html` is present in the output directory

### Environment Variables
If your application needs environment variables:
1. Go to Project Settings → Environment Variables
2. Add your variables
3. Redeploy the project

## Post-Deployment

1. **Custom Domain** (Optional)
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

2. **SSL/TLS Certificate**
   - Automatically provided by Vercel
   - HTTPS is enabled by default

3. **Analytics**
   - Monitor performance in Vercel Analytics
   - Check deployment logs in the Deployments tab

## Monitoring and Logs

1. **View Deployment Logs**
   - Go to Deployments tab
   - Click on any deployment to see build logs
   - Check for errors or warnings

2. **Real-time Monitoring**
   - Use Vercel Analytics to track performance
   - Monitor Core Web Vitals
   - Check error rates and response times

## Rollback

If a deployment has issues:
1. Go to Deployments tab
2. Find the previous working deployment
3. Click the three dots menu
4. Select "Promote to Production"

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Angular on Vercel](https://vercel.com/guides/angular)
- [Vercel CLI Reference](https://vercel.com/cli)

## Support

For issues with:
- **Vercel:** Visit https://vercel.com/support
- **Angular:** Check https://angular.dev
- **GitHub Integration:** See https://vercel.com/docs/git

---

**Last Updated:** April 6, 2026
**Repository:** https://github.com/adawaty/ariifsutvercel
