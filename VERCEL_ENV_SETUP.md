# Vercel Environment Variables Setup

## Required Environment Variable

Your News App needs the NewsAPI key to be configured in Vercel:

### Steps to Add Environment Variable in Vercel:

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Select your project: `news-app` or `News_app`
3. Click on **Settings** tab
4. Click on **Environment Variables** in the left sidebar
5. Add the following environment variable:

   - **Key**: `NEWS_API_KEY`
   - **Value**: `fb3bba8b049e4cd2ba39389e71851f02`
   - **Environment**: Select all (Production, Preview, Development)

6. Click **Save**
7. Go to **Deployments** tab
8. Click the **...** menu on the latest deployment
9. Click **Redeploy** to apply the new environment variable

## Alternative Variable Name

If the above doesn't work, also add:

   - **Key**: `REACT_APP_NEWS_API_KEY`
   - **Value**: `fb3bba8b049e4cd2ba39389e71851f02`
   - **Environment**: Select all (Production, Preview, Development)

## Verification

After redeployment, your app should load news successfully without 401 errors.
