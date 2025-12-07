# Frontend (React + TypeScript)

This folder contains a Vite + React + TypeScript frontend for the Daily Habit Tracker lab.

Quick start

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Run dev server:

```bash
npm run dev
```

3. Open `http://localhost:3000` in the browser.

Configuration
- The frontend calls the backend at `http://localhost:8080/habits` by default.
- To change the backend URL, set the `VITE_BACKEND_URL` environment variable, e.g.:

```bash
VITE_BACKEND_URL=http://HOST:PORT npm run dev
```

Files of interest
- `src/api.ts` — API client for backend
- `src/components` — `HabitForm`, `HabitList`, `HabitItem`
- `src/App.tsx` — main application UI
