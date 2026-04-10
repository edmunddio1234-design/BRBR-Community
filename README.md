# BRBR Community

A community platform for readers of "Beautifully Ratchet, Brilliantly Real"

## Tech Stack

- **Frontend:** React 18 with Vite (deployed on Vercel)
- **Backend:** Node.js/Express (deployed on Render)
- **Database:** PostgreSQL

## Project Structure

```
brbr-community/
├── frontend/                # React/Vite frontend app
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── vercel.json
└── backend/                 # Node.js/Express API
```

## Getting Started

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The app will run at `http://localhost:3000`

### Frontend Build

To build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

### Backend Setup

Refer to backend-specific setup instructions in the backend directory.

## Deployment

- **Frontend:** Deploy to Vercel using the frontend directory as the root
- **Backend:** Deploy to Render with Node.js runtime

## Environment Variables

### Frontend (.env)
- `VITE_API_URL` - API endpoint (defaults to `http://localhost:3001`)

## Development

- Frontend runs on port 3000
- Backend runs on port 3001 (proxied at `/api`)
