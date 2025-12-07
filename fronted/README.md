# Frontend (Expo)

This folder contains a minimal Expo frontend scaffold for the `advance-oop-tests` project.

Quick start

1. Change into the `fronted` directory:

```bash
cd fronted
```

2. Install dependencies (already installed if scaffold ran):

```bash
npm install
```

3. Run the app in a browser (web):

```bash
npm run web
```

Other commands:

- `npm run android` — run on Android device/emulator
- `npm run ios` — run on iOS (macOS required)

Notes
- The project was scaffolded with `create-expo-app` (blank template).
- Edit `App.js` to start developing the frontend. You can add navigation, screens, and connect to the backend at `../backend`.

Backend connection
- By default the frontend expects a backend at `http://localhost:8080` with these REST endpoints:
	- `GET /habits` — list habits (returns array of Habit JSON)
	- `POST /habits` — create habit (accepts JSON: {name, frequency, status, note})
	- `PUT /habits/{id}` — update habit (this frontend uses `{status}` to toggle)
	- `DELETE /habits/{id}` — delete habit

If your backend runs on a different host/port (e.g. Codespace remote), you can set the global variable `__BACKEND_URL__` before the app runs. For example in web preview you can open devtools and set:

```js
window.__BACKEND_URL__ = 'http://HOST:PORT'
```

Or edit `src/api.js` and set `BASE_URL` to your backend address.
