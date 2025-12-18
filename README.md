## Nano Banana Demo UI

Simple **face‑to‑face interface** you can use in meetings to drive the Nano Banana Server API live:

- Type an Outfit / Cosplay prompt
- Choose a small batch size
- Call your Nano Banana server
- Show the generated images in a clean gallery

### 1. Prerequisites

- Node.js 18+ installed
- A running **Nano Banana Server API** (official or the FastAPI wrapper)  
  - Note the **base URL** and (if needed) **API key**

### 2. Install & Run

```bash
npm install
```

Create a `.env` file next to `server.js`:

```bash
PORT=3000
NANO_BANANA_API_BASE=http://localhost:10000
NANO_BANANA_API_KEY=your_api_key_here
```

Then start the demo server:

```bash
npm start
```

Open `http://localhost:3000` in your browser.

### 3. How It Works

- Frontend: `public/index.html`
  - Prompt textarea + batch size
  - Calls `POST /api/generate` on this Node server
  - Shows returned images in a grid
- Backend: `server.js`
  - Proxies `POST /api/generate` → `POST ${NANO_BANANA_API_BASE}/generate`
  - Sends `{ prompt, n: batchSize }` and your API key
  - Returns whatever JSON the Nano Banana server responds with

> **Important:**  
> Adjust the `/generate` endpoint path and request/response shape in `server.js` to match your actual Nano Banana Server API documentation.


