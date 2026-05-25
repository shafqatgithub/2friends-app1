# 2friends — Firebase + Supabase + APK (Step by Step)

Roman Urdu + English guide. Live app: https://2friends-app1.vercel.app/

---

## Kya kya use ho raha hai?

| Service | Kaam |
|---------|------|
| **Supabase** | Email login/signup, user profiles, orders database |
| **Firebase** | Analytics (events), orders copy in **Firestore** |
| **Capacitor** | Android **APK** file |

Agar `.env` khali ho to app **demo mode** mein chalegi (pehle jaisa local login).

---

# PART 1 — Supabase setup

### Step 1: Account banao

1. https://supabase.com → **Start your project**
2. GitHub se sign in
3. **New project** → naam: `2friends` → password save karo → region choose → **Create**

### Step 2: Database tables

1. Left menu → **SQL Editor** → **New query**
2. File `supabase/schema.sql` kholo (project folder mein)
3. Poora SQL copy karke Supabase editor mein paste → **Run**

### Step 3: API keys

1. **Project Settings** (gear) → **API**
2. Copy karo:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`

### Step 4: Email login enable

1. **Authentication** → **Providers** → **Email** → ON
2. Testing ke liye: **Authentication** → **Settings** →  
   **Confirm email** = OFF (baad mein ON kar lena production par)

### Step 5: Local `.env`

```powershell
cd "c:\Users\Muhammad Shafqat\Downloads\Mobile app\2friends-app"
copy .env.example .env
```

`.env` mein Supabase URL aur anon key paste karo.

```powershell
npm run dev
```

`/login` par naya account banao — ab **Supabase** use hoga.

---

# PART 2 — Firebase setup

### Step 1: Project banao

1. https://console.firebase.google.com
2. **Add project** → naam `2friends` → Analytics ON (optional) → Create

### Step 2: Web app add karo

1. Home par **Web** icon `</>`
2. App nickname: `2friends-web` → Register
3. Config object copy karo (`apiKey`, `authDomain`, …)

### Step 3: Firestore (orders)

1. **Build** → **Firestore Database** → **Create database**
2. **Start in test mode** (testing) → region select
3. **Rules** tab — testing ke liye:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow create: if true;
      allow read: if request.auth != null;
    }
  }
}
```

Production par rules strict karna.

### Step 4: `.env` mein Firebase keys

`.env.example` jaisi lines bharo:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

`npm run dev` restart karo. Order place karo → Firebase **Firestore** mein `orders` collection check karo.

---

# PART 3 — Vercel par keys (live site)

1. https://vercel.com → project **2friends-app1**
2. **Settings** → **Environment Variables**
3. Har `VITE_...` variable add karo (same as `.env`)
4. **Production** checkbox ON → Save
5. **Deployments** → **Redeploy**

Bina redeploy ke nayi keys live site par nahi jati.

---

# PART 4 — Android APK banayein

### Pehle: requirements

- [Android Studio](https://developer.android.com/studio) installed
- JDK 17+ (Android Studio ke sath aata hai)

### Step 1: `.env` set karo (zaroori APK ke liye)

APK build se **pehle** `.env` complete karo — keys build ke andar embed hoti hain.

### Step 2: Build + sync

```powershell
cd "c:\Users\Muhammad Shafqat\Downloads\Mobile app\2friends-app"
npm run build:apk
```

Ya alag steps:

```powershell
npm run build
npx cap sync android
npx cap open android
```

### Step 3: Android Studio se APK

1. Gradle sync complete hone do
2. Menu: **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
3. Notification: **locate** → file:

```
android\app\build\outputs\apk\debug\app-debug.apk
```

4. Is file ko phone par copy karke install karo  
   (Settings → Unknown sources allow)

### Step 4: Play Store ke liye (signed APK)

**Build** → **Generate Signed Bundle / APK** → APK → new keystore banao → release build

---

# PART 5 — GitHub push (optional)

```powershell
cd "c:\Users\Muhammad Shafqat\Downloads\Mobile app\2friends-app"
git add .
git commit -m "Add Firebase and Supabase"
git push
```

`.env` kabhi push **mat** karna — sirf `.env.example`.

---

## Checklist

- [ ] Supabase project + `schema.sql` run
- [ ] `.env` with Supabase keys
- [ ] Firebase project + Firestore + `.env` keys
- [ ] Vercel environment variables + redeploy
- [ ] `npm run dev` — login test
- [ ] Checkout — order Supabase + Firestore mein
- [ ] `npm run build:apk` — Android Studio — APK

---

## Problems?

| Issue | Fix |
|-------|-----|
| Login error | Supabase → Auth → Email ON, confirm email OFF for test |
| Order insert fail | `schema.sql` dubara run; RLS policies check |
| Firebase no data | Firestore rules; `.env` keys sahi? |
| APK blank / no login | `.env` bhar ke `npm run build` phir `cap sync` |
| Vercel still demo | Env vars + **Redeploy** |

Repo: https://github.com/shafqatgithub/2friends-app1
