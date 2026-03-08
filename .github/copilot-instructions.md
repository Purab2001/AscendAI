# Copilot Instructions for AscendAI

## Architecture and boundaries
- Monorepo with two independent Node apps: `client/` (React 19 + Vite + Tailwind v4) and `server/` (Express 5, ESM).
- Frontend routes are defined in `client/src/App.jsx`; authenticated app pages live under `/ai/*` and render through `client/src/pages/Layout.jsx` + `client/src/components/Sidebar.jsx`.
- Backend API is mounted in `server/server.js` under `/api/ai` and `/api/user`.
- Every feature stores output in the same `creations` table via Neon SQL (`server/configs/db.js`), then the dashboard/community read from that table.

## Auth, plans, and request flow (critical)
- Server-wide Clerk middleware is enabled in `server/server.js`, and `app.use(requireAuth())` protects all `/api/*` routes.
- Route handlers also use custom `auth` middleware (`server/middlewares/auth.js`) to enrich requests with:
  - `req.plan` (`'free' | 'pro'` from Clerk plan check)
  - `req.free_usage` (tracked in Clerk `privateMetadata.free_usage`)
- Free plan behavior is enforced in controllers (not in routes): text generation is limited to 10 uses; image/edit/resume features are Pro-only.
- Client must send Clerk JWT on every API call: `Authorization: Bearer ${await getToken()}` (see any page in `client/src/pages/*.jsx`).

## API and data conventions
- Standard response shape is `{ success: boolean, ... }`; failures usually return HTTP 200 with `success: false` and `message`.
- Text features (`generate-article`, `generate-blog-title`, `resume-review`) return markdown content and are rendered via `react-markdown` inside `.reset-tw` wrapper.
- File upload endpoints require multipart + exact field names:
  - `image` for `/api/ai/remove-image-background` and `/api/ai/remove-image-object`
  - `resume` for `/api/ai/resume-review`
- Community likes update a Postgres `text[]` column (`likes`) in `toggleLikeCreation`; keep user IDs as strings.

## AI provider and media integrations
- LLM calls use OpenAI SDK configured for Gemini-compatible endpoint in `server/controllers/aiController.js` (`baseURL` + `GEMINI_API_KEY`).
- Image generation uses Clipdrop (`CLIPDROP_API_KEY`) then uploads result to Cloudinary.
- Background/object removal and generated images are persisted as Cloudinary URLs in `creations.content`.

## Frontend implementation patterns
- Existing pages set `axios.defaults.baseURL = import.meta.env.VITE_BASE_URL` at file scope; keep this consistent when adding pages.
- Most page components follow this shape: local `loading/content` state, `onSubmitHandler`, toast on `!data.success` and `catch`.
- Use Clerk UI primitives already in use (`Protect`, `PricingTable`, `UserButton`, `SignIn`) instead of custom auth/subscription UI.
- Styling is Tailwind-first; primary color token is `--color-primary` in `client/src/index.css`.

## Developer workflows
- Install dependencies separately:
  - `cd client && npm install`
  - `cd ../server && npm install`
- Run locally in 2 terminals:
  - `cd server && npm run server` (nodemon)
  - `cd client && npm run dev` (Vite)
- Frontend lint: `cd client && npm run lint`
- Production run: `cd client && npm run build`, then `cd ../server && npm start`

## Environment variables
- Client (`client/.env`): `VITE_CLERK_PUBLISHABLE_KEY`, `VITE_BASE_URL`
- Server (`server/.env`): `CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`, `DATABASE_URL`, `GEMINI_API_KEY`, `CLIPDROP_API_KEY`, `CLOUDINARY_*`, `PORT`

## High-value files to reference before changes
- Routing/layout: `client/src/App.jsx`, `client/src/pages/Layout.jsx`, `client/src/components/Sidebar.jsx`
- API usage examples: `client/src/pages/WriteArticle.jsx`, `GenerateImages.jsx`, `RemoveBackground.jsx`, `ReviewResume.jsx`
- Backend wiring: `server/server.js`, `server/routes/*.js`, `server/middlewares/auth.js`, `server/controllers/*.js`