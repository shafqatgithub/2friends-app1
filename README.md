# 2friends — Mobile Shop App

E-commerce app based on your static **2friends** design. Works in the browser, on **Vercel**, **GitHub Pages**, and as an **Android APK** (Capacitor).

## Features

- Home, Shop, Cart/Checkout, Login/Sign up, Profile
- Shopping cart (saved in browser)
- Demo login (local — no backend required)
- Same colors & layout as your HTML designs

## Quick start (local)

```bash
cd 2friends-app
npm install
npm run dev
```

Open http://localhost:5173

## Build for production

```bash
npm run build
npm run preview
```

## Deploy live on Vercel

1. Push this folder to GitHub (repo root = `2friends-app` or whole repo).
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import repo.
3. **Root Directory:** `2friends-app` (if app is in subfolder).
4. **Build Command:** `npm run build`
5. **Output Directory:** `dist`
6. Deploy — `vercel.json` already handles SPA routing.

## Deploy on GitHub Pages

1. In repo **Settings → Pages**, set source to **GitHub Actions**.
2. Push to `main` — workflow `.github/workflows/deploy-pages.yml` runs automatically.
3. For a project site (`username.github.io/repo-name/`), the workflow sets `BASE_PATH` for you.

## Android APK

**Requirements:** [Android Studio](https://developer.android.com/studio) + JDK 17+

```bash
npm run cap:sync          # build web app + copy to Android
npx cap add android       # first time only (if android/ missing)
npm run cap:android       # opens Android Studio
```

In Android Studio: **Build → Build Bundle(s) / APK(s) → Build APK(s)**  
APK path: `android/app/build/outputs/apk/debug/app-debug.apk`

For Play Store release, use **Build → Generate Signed Bundle / APK**.

### First-time Capacitor init

If `android/` folder does not exist:

```bash
npm run build
npx cap add android
npx cap sync
```

## Project structure

```
src/
  pages/       Home, Shop, Checkout, Login, Profile
  components/  Navigation, product cards
  context/     Cart + Auth state
  data/        Products catalog
```

## Notes

- Login/signup is **demo only** (stored in `localStorage`). Connect Firebase, Supabase, or your API for real auth.
- Payments are simulated — integrate Stripe/Razorpay/JazzCash when you go live.
