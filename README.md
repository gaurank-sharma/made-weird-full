# Made Weird

Bold, 3D-printed novelty objects — storefront rebuild of madeweird.in (originally a Lovable design), now a plain React + Express stack.

## Structure

- `frontend/` — React (Vite) + Tailwind CSS v4 + React Router
- `backend/` — Node + Express. Product catalog/testimonials/process still live in a JSON file store (`backend/data/db.json`); accounts, carts and orders live in MongoDB.

## Accounts, cart & checkout

Signup/login use email + password (hashed with bcrypt) and a JWT bearer token stored in the browser. The cart is stored per-account in MongoDB, so it's tied to being logged in — "Quick add" on a product prompts login if you're signed out. Checkout only offers Cash on Delivery; placing an order snapshots the cart into an `Order` document and empties the cart.

## Running locally

**Backend** (runs on port 4000) — needs `backend/.env` with `DB=<your MongoDB connection string>` and `JWT_SECRET=<random string>` (both already present locally):
```bash
cd backend
npm install
npm run dev
```

**Frontend** (runs on port 5173, proxies `/api` to the backend):
```bash
cd frontend
npm install
npm run dev
```

Then open the printed local URL (e.g. `http://localhost:5173`).

## API

| Method | Route | Description |
|---|---|---|
| GET | `/api/products` | All products (`?category=`, `?featured=true/false`) |
| GET | `/api/products/:id` | Single product |
| GET | `/api/categories` | Shop-by-category list |
| GET | `/api/testimonials` | Customer testimonials |
| GET | `/api/process` | "How it's made" steps |
| GET | `/api/prototypes` | Under-production items |
| POST | `/api/newsletter` | `{ email }` — subscribe for drops |
| POST | `/api/waitlist` | `{ email, prototypeId }` — join a prototype waitlist |
| POST | `/api/contact` | `{ name, email, message }` |
| POST | `/api/auth/signup` | `{ name, email, password }` → `{ token, user }` |
| POST | `/api/auth/login` | `{ email, password }` → `{ token, user }` |
| GET | `/api/auth/me` | Current user (requires `Authorization: Bearer <token>`) |
| GET | `/api/cart` | Current user's cart |
| POST | `/api/cart` | `{ productId, name, image, price, color, qty }` — add/increment an item |
| PATCH | `/api/cart/:productId` | `{ qty }` — update quantity (removes item if `qty <= 0`) |
| DELETE | `/api/cart/:productId` | Remove one item |
| DELETE | `/api/cart` | Empty the cart |
| POST | `/api/orders` | `{ address }` — places a Cash on Delivery order from the current cart |
| GET | `/api/orders` | Current user's order history |
| GET | `/api/orders/:id` | Single order |

All `/api/cart` and `/api/orders` routes require the `Authorization: Bearer <token>` header from signup/login.
# made-weird-full
