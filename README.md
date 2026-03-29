# Devanta

Turn a **GitHub profile** into a **styled portfolio page**. Paste a profile URL or username on the home screen; the app loads **public** data from GitHub and renders it with one of three React templates (minimal, modern, creative).

---

## What you paste and what happens

1. **Input** — In the header field you can enter:
   - A profile URL, e.g. `https://github.com/octocat`
   - A repo URL (the **owner** is used), e.g. `https://github.com/octocat/Hello-World`
   - A bare username, e.g. `octocat` or `@octocat`

2. **Generate** — The Next.js app sends your text to the backend:  
   `POST /api/v1/github/preview` with JSON `{ "input": "…" }`.

3. **Backend** — Express parses a GitHub **login** from the string, then calls GitHub’s **public** REST API (no login to Devanta required):
   - `GET /users/{login}` — display name, avatar, bio, public email (if the user exposes it), profile URL
   - `GET /users/{login}/repos` — public repositories (up to 100, sorted by recent update)

4. **Portfolio JSON** — The server builds a single `PortfolioData` object (see `frontend/src/types/portfolio.ts`):
   - **About** — name, avatar, bio (GitHub bio or a short default)
   - **Featured projects** — up to **6** repos, ordered by **stars** (then recency)
   - **Tech stack** — distinct `language` values from those repos
   - **GitHub stats** — count of repos returned, sum of stars, “primary” language by frequency
   - **Contact** — GitHub profile link; email only if the GitHub profile exposes a public email

5. **React** — The client receives `{ username, data }` and passes `data` into `PortfolioRenderer`, which switches templates via **TemplateSwitcher** (editorial / SaaS / creative).

So end-to-end: **paste link → parse username → GitHub public API → structured JSON → themed React portfolio**.

**Limits:** Only **public** repos and **public** profile fields. Private repos and emails hidden on GitHub will not appear. GitHub rate-limits unauthenticated API use; for heavier use, set a token on the server (see below).

---

## Repository layout

| Area | Role |
|------|------|
| `frontend/` | Next.js 14 app — UI, templates, `POST` to preview API |
| `backend/` | Express API — health, GitHub preview, OAuth + DB routes for future “saved” portfolios |

Design notes and a fuller schema live in [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## Run locally

### Prerequisites

- Node.js 18+
- PostgreSQL (only if you use OAuth / DB-backed routes; **preview works without DB** if the server starts)

### Backend

```bash
cd backend
cp .env.example .env   # create if you use OAuth/DB; see below
npm install
npm run dev
```

Default URL: `http://localhost:5001`  
Health: `GET http://localhost:5001/api/v1/health`

Optional `.env` for the preview path:

- `GITHUB_TOKEN` or `GITHUB_PAT` — classic or fine-grained PAT; raises GitHub API rate limits and avoids some 403s when many people use the same IP.

Other variables (OAuth, DB, JWT) matter for `/api/v1/auth/*`, `/api/v1/github/repos` (sync), and `/api/v1/portfolios/*` — not required for **preview only**.

### Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env.local` if the API is not on the default host:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5001
```

For production, also set your canonical URL so metadata (Open Graph, `metadataBase`) resolves correctly:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

```bash
npm run dev
```

Open `http://localhost:3000`, paste a GitHub URL or username, click **Generate**.

**Release check (lint + tests + production build):**

```bash
cd frontend && npm run verify
```

---

## API reference (preview)

`POST /api/v1/github/preview`

**Body:** `{ "input": "https://github.com/username" }` (or `"username"` / `"url"` keys are also read)

**200:** `{ "message", "username", "data" }` — `data` matches `PortfolioData` in the frontend types.

**400** — Could not parse a valid GitHub username from the input.  
**404** — User does not exist.  
**403** — Rate limit or GitHub denied the request; configure `GITHUB_TOKEN` on the backend if needed.

---

## Tech stack

- **Frontend:** Next.js, React, Tailwind CSS, Framer Motion, Lucide icons  
- **Backend:** Express, axios (GitHub HTTP), PostgreSQL when enabled  

---

## License

ISC (see `backend/package.json`; adjust per your preference).
