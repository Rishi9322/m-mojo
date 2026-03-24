# ExpenseTrack

[![CI](https://github.com/Rishi9322/m-mojo/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/Rishi9322/m-mojo/actions/workflows/ci-cd.yml)
[![Live Status](https://img.shields.io/website?url=https%3A%2F%2Fmmojo.vercel.app&label=live&up_message=online&down_message=offline)](https://mmojo.vercel.app)
[![Vercel](https://img.shields.io/badge/deploy-vercel-black?logo=vercel)](https://vercel.com)

A modern expense-tracking dashboard built with React and Vite, powered by Turso/libSQL, with analytics charts, live currency conversion, CI/CD on GitHub Actions, and production hosting on Vercel.

Live app: https://mmojo.vercel.app

Repository: https://github.com/Rishi9322/m-mojo

## Highlights

- Fast React 19 + Vite 8 frontend
- Turso/libSQL storage using @libsql/client/web
- Expense CRUD with date and category support
- Dashboard summary with visual analytics (doughnut + bar charts)
- Live exchange-rate conversion from USD
- Dark mode and responsive UI
- CI/CD pipeline with automatic production deploys on main

## Tech Stack

- React 19
- Vite 8
- Chart.js + react-chartjs-2
- Turso/libSQL (@libsql/client/web)
- ESLint 9
- GitHub Actions
- Vercel

## Architecture

1. UI Layer: React components in src/components.
2. App State: managed in src/App.jsx using hooks.
3. Data Layer: Turso operations in src/lib/db.js.
4. Visualization: Chart.js via ExpenseCharts component.
5. Deployment: GitHub Actions workflow deploys to Vercel.

## Project Structure

```text
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
.github/
	workflows/
		ci-cd.yml
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- Turso database URL and auth token

### Install

```bash
npm install
```

### Environment Variables

Copy the template and fill values:

```bash
cp .env.example .env
```

```env
VITE_TURSO_URL=https://your-database-name.turso.io
VITE_TURSO_TOKEN=your_turso_token
```

### Run Locally

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## Scripts

- npm run dev: Start development server
- npm run lint: Run ESLint checks
- npm run build: Create production build
- npm run preview: Preview built app locally

## CI/CD

Workflow file: .github/workflows/ci-cd.yml

### Pipeline Behavior

1. Triggers on push, pull_request, and workflow_dispatch.
2. Runs quality checks:
	 - npm ci
	 - npm run lint
	 - npm run build
3. Deploys to Vercel production when code is pushed to main.

### Required GitHub Secrets

- VERCEL_TOKEN
- VERCEL_ORG_ID
- VERCEL_PROJECT_ID

## Deployment

### Automatic Deploy (Recommended)

1. Configure required GitHub secrets.
2. Push to main.
3. GitHub Actions runs CI and deploys to Vercel.

### Manual Deploy

```bash
npx vercel login
npx vercel link
npx vercel deploy --prod
```

## Audit Summary (March 2026)

### Quality Status

- Lint: passing
- Build: passing
- npm audit (moderate+): no vulnerabilities found

### Important Security Findings

1. A real Turso token was present in local .env during audit.
2. Vite frontend environment variables are visible in client bundles.
3. Direct browser-to-database writes are risky for production systems.

The app now fails gracefully when Turso env vars are missing and shows a user-visible DB error instead of a blank screen.

### Recommended Next Security Improvements

1. Rotate exposed credentials immediately.
2. Move DB writes behind a backend/API layer.
3. Add proper authentication and authorization.
4. Use scoped/short-lived tokens where possible.

## Known Limitations

- Current passcode flow is client-side vault partitioning, not full authentication.
- Best suited for demo or low-risk personal usage in current architecture.

## Roadmap

- Add server-side auth and session management
- Add test coverage (unit + integration)
- Add export/import for expense history
- Add budget alerts and recurring expense support

## License

This project is currently unlicensed. Add a LICENSE file if you plan to open source it publicly.
