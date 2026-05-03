
# Triplink Tours Website

React + Vite website for Triplink Tours.

## Running Locally

Run `npm install` to install dependencies.

Run `npm run dev` to start the development server.

Run `npm run dev:full` to start the website with the local database API.

Run `npm run build` to create the production build in `dist/`.

Run `npm run start` after building to serve the production website with the local database API.

## Local Database Admin

The admin panel can save Triplink content to a local SQLite database file at `data/triplink.db`.

Use these commands for local DB mode:

```bash
npm run dev:full
```

Open:

```text
http://127.0.0.1:5173/#/admin
```

Default admin passcode:

```text
triplink-admin
```

For production on your own server/VPS:

```bash
npm run build
npm run start
```

Then keep the Node server running. The website and API will run together, and updates from the admin panel will be stored in `data/triplink.db`.

To change the admin passcode:

```bash
TRIPLINK_ADMIN_PASSCODE=your-secure-passcode npm run start
```

On Windows PowerShell:

```powershell
$env:TRIPLINK_ADMIN_PASSCODE="your-secure-passcode"; npm run start
```

## Deploying to GitHub Pages

This repo includes `.github/workflows/deploy.yml`. After pushing to GitHub:

1. Go to the repository on GitHub.
2. Open `Settings` > `Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. Push to the `main` branch.
5. Open the `Actions` tab and wait for `Deploy to GitHub Pages` to finish.

Your site URL will be shown in the workflow summary and in `Settings` > `Pages`.
