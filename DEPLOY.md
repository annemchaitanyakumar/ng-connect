# Deploying Networq Global Connect (TanStack Start)

Because TanStack Start is a full-stack framework powered by **Nitro**, it runs an SSR (Server-Side Rendering) backend. If you deploy it as a purely static site, visiting sub-pages directly or refreshing them will result in a "Wrong URL" or 404 error.

Follow these configurations to deploy your SSR application successfully:

---

## 1. Deploying on Vercel (Zero Config)

Vercel automatically detects Nitro SSR output (`.vercel/output`) when you configure the project correctly:

1. **Import the repository** into Vercel.
2. In the **Build & Development Settings**:
   - **Framework Preset**: Set this to **Other** (do *not* select Vite or React, as they will treat it as a static-only SPA).
   - **Build Command**: `npm run build`
   - **Output Directory**: Leave it blank (Vercel will auto-detect `.vercel/output` created by the build).
3. Click **Deploy**. Vercel will launch your site as a serverless SSR app where all routing and path refreshes function perfectly!

---

## 2. Deploying on Netlify

We have added a custom [netlify.toml](file:///C:/Users/chait/.gemini/antigravity-ide/scratch/networq-global-connect/netlify.toml) file to your repository. This tells Netlify to build the app and route all incoming traffic through the serverless function.

1. **Import the repository** into Netlify.
2. Netlify will automatically parse the `netlify.toml` file and set:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist/client`
3. Click **Deploy**. Netlify will build the server functions and link them automatically.
