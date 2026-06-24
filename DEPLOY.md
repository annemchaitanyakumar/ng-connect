# Deploying Networq Global Connect (TanStack Start)

Because TanStack Start is a full-stack SSR framework powered by **Nitro**, it must be deployed as a serverless app — not as a static site — otherwise refreshing any sub-page will return a 404.

---

## Deploying on Netlify ✅ (Recommended)

A `netlify.toml` has already been added to the repository root with the correct settings. Netlify auto-detects TanStack Start / Nitro and deploys the SSR server as Netlify Functions.

**When importing the project in Netlify:**

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Node version | `20` |

1. Go to [app.netlify.com](https://app.netlify.com) → **Add new site → Import an existing project**.
2. Connect your GitHub repository `annemchaitanyakumar/ng-connect`.
3. Netlify will auto-detect the `netlify.toml` and apply the correct settings.
4. Click **Deploy** — all SSR routes and `/services/*` paths will work correctly.

---

## Deploying on Vercel ✅

1. Go to [vercel.com](https://vercel.com) → **Add New Project → Import Git Repository**.
2. Import `annemchaitanyakumar/ng-connect`.
3. In the **Build & Development Settings**:
   - **Framework Preset**: **Other** (do NOT select Vite — it forces a static build)
   - **Build Command**: `npm run build`
   - **Output Directory**: leave **blank** (Vercel auto-detects `.vercel/output`)
4. Click **Deploy**.

---

> [!IMPORTANT]
> On both platforms: SSR apps must **NOT** be treated as static sites. Nitro handles generating the correct serverless function output automatically when you set the build command to `npm run build`.

