# Deploying Networq Global Connect (TanStack Start)

Because TanStack Start is a full-stack SSR framework, it must be deployed as an SSR/Node.js web service rather than a static site.

---

## Deploying on Render.com ✅ (Recommended)

Render.com is the recommended platform for deploying this Node.js SSR application. A `render.yaml` configuration is included in the project root to automate setting up the Web Service.

### Setting up on Render:

1. Go to [dashboard.render.com](https://dashboard.render.com/) and click **New + → Web Service**.
2. Connect your GitHub repository `annemchaitanyakumar/ng-connect`.
3. Configure the following settings (Render may auto-detect these from `render.yaml`):
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npx srvx serve --prod --entry dist/server/server.js -s ../client`
4. Add the following **Environment Variables** in the settings:
   - `NODE_ENV` = `production`
   - `HOST` = `0.0.0.0`
5. Click **Deploy Web Service**.

---

## Deploying on Vercel ✅

1. Go to [vercel.com](https://vercel.com) → **Add New Project → Import Git Repository**.
2. Import `annemchaitanyakumar/ng-connect`.
3. In the **Build & Development Settings**:
   - **Framework Preset**: **Other** (do NOT select Vite — it forces a static build)
   - **Build Command**: `npm run build`
   - **Output Directory**: leave **blank** (Vercel auto-detects the built serverless output)
4. Click **Deploy**.

---

## Manual VPS / Self-Hosting (Node.js) ✅

If you are self-hosting on a custom VPS or server:

1. Run the build command:
   ```bash
   npm run build
   ```
2. Start the production server using the universal server runner `srvx` (included in dependencies):
   ```bash
   npx srvx serve --prod --entry dist/server/server.js -s ../client --port 8080
   ```
   You can manage the server using a process manager like **PM2** to ensure it remains running.
