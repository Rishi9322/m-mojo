# ExpenseTrack

A React + Vite expense tracker with Turso (libSQL) persistence, category analytics, and live currency conversion.

## Stack

- React 19 + Vite 8
- Turso/libSQL via `@libsql/client/web`
- Chart.js + `react-chartjs-2`
- ESLint 9
- GitHub Actions CI/CD + Vercel deployment

## Features

- Passcode-based local vault selection (client-side user partitioning)
- Expense CRUD with Turso persistence
- Date and category tracking
- Dashboard summary and category breakdown
- Bar and doughnut charts for spending insights
- Live USD conversion using Frankfurter API
- Dark mode toggle and responsive UI

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create environment file:

```bash
cp .env.example .env
```

3. Fill `.env` values:

```env
VITE_TURSO_URL=...
VITE_TURSO_TOKEN=...
```

4. Run app:

```bash
npm run dev
```

## Scripts

- `npm run dev` - Start local dev server
- `npm run lint` - Run ESLint
- `npm run build` - Build production assets
- `npm run preview` - Preview production build

## Project Audit (March 2026)

### Build and Quality Status

- `npm run lint`: passing
- `npm run build`: passing

### Critical Findings

1. A real Turso token existed in local `.env` during audit.
2. Frontend environment variables are bundled client-side in Vite, so this token can be extracted by users.

### Recommendations

1. Rotate exposed Turso token immediately.
2. Move database writes behind a server/API layer instead of direct browser-to-DB auth.
3. Restrict DB auth scope and apply short-lived credentials where possible.
4. Keep `.env` untracked and use `.env.example` for templates.

## CI/CD Pipeline

Pipeline file: `.github/workflows/ci-cd.yml`

### What it does

1. Runs on `push`, `pull_request`, and manual trigger.
2. Executes quality gates:
	 - `npm ci`
	 - `npm run lint`
	 - `npm run build`
3. Deploys to Vercel on pushes to `main` after quality passes.

### Required GitHub Secrets

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Deploying with Vercel

### Option A: Automatic via GitHub Actions

1. Add required repository secrets.
2. Push to `main`.
3. GitHub Actions will run CI and deploy to Vercel.

### Option B: Manual via Vercel CLI

```bash
npx vercel login
npx vercel link
npx vercel deploy --prod
```

## Repository Structure

```
src/
	components/
		CurrencyConverter.jsx
		ExpenseCharts.jsx
		ExpenseForm.jsx
		ExpenseItem.jsx
		ExpenseList.jsx
		Header.jsx
		LandingPage.jsx
		Login.jsx
		SummaryPanel.jsx
	lib/
		db.js
	App.jsx
	index.css
	main.jsx
```

## Notes

- This app currently uses client-side passcode-based partitioning, not full authentication.
- For production multi-user security, add a backend auth layer and row-level access controls.
