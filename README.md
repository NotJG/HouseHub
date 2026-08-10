# Home — house hub

A shared PWA for groceries, tasks, calendar, and the house agreement. No backend framework —
plain HTML/CSS/JS, with Supabase as the shared database so everyone's data stays in sync live.

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) → New project (free tier is plenty for this).
2. Once it's created, open **SQL Editor** → New query, paste in the contents of `supabase.sql`
   from this folder, and run it. That creates the `house_data` table, opens it up for the four
   of you (no login), and turns on realtime sync.
3. Go to **Settings → API**. Copy the **Project URL** and the **anon public** key.

## 2. Fill in `config.js`

Open `config.js` in this folder and paste in the two values from step 1:

```js
window.HOUSE_CONFIG = {
  SUPABASE_URL: "https://xxxxxxxx.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOi..."
};
```

## 3. Push to GitHub

```bash
cd house-hub
git init
git add .
git commit -m "House hub"
git remote add origin https://github.com/NotJG/house-hub.git   # create this repo on GitHub first
git push -u origin main
```

## 4. Deploy on Vercel

1. [vercel.com/new](https://vercel.com/new) → import the `house-hub` repo.
2. Framework preset: **Other** (it's a static site — no build command, no output directory needed).
3. Deploy. You'll get a URL like `house-hub.vercel.app` — you can add a custom domain later
   under Project Settings → Domains if you want.

## 5. Install it on each phone

Open the Vercel URL on each of your phones:

- **iPhone (Safari):** Share → Add to Home Screen.
- **Android (Chrome):** ⋮ menu → Install app (or you'll get an automatic install prompt).

This time it's a *real* installable PWA — its own icon, opens full-screen with no browser
chrome, and the app shell (layout, styles) is cached for offline use. Data itself (groceries,
tasks, etc.) still needs a connection to load/save, same as any live app.

The first time each person opens it, they'll tap their name once — that choice is saved to
that phone's browser storage and won't ask again or let you switch back, same as before.

## Notes

- **No login.** This matches the pattern used in your other single-purpose household tools —
  anyone with the URL can read/write. Fine for a private house tool among the four of you, just
  don't put anything sensitive (financial account numbers, etc.) in the agreement text.
- **Updating the app later:** just edit `index.html` (or hand it back to Claude), push to GitHub,
  Vercel redeploys automatically.
- **Realtime sync:** when one person adds a task or grocery item, everyone else's screen updates
  within a second or two without needing to refresh.
