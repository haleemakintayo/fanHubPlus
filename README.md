# fanHubPlus

> **8 Fandom Universes • One Neo-Brutalist Command Center**

Fan Hub Plus is a full-stack, multi-fandom web application built for pop-culture enthusiasts, lore archivists, cosplayers, and collectors. It unites **8 core fandom universes** under a single, moderator-vetted, high-contrast **Neo-Brutalist** portal — combining discovery, archival, and community engagement with zero e-commerce.

- **Frontend:** React 19 + Vite 8 + Tailwind CSS v4
- **Backend:** Django 5 + Django REST Framework + SimpleJWT
- **Database:** SQLite3 (dev, pre-seeded) / MySQL 8.0+ compatible (`seed_data.sql`)

---

## Table of Contents

- [Features](#features)
- [Fandom Universes](#fandom-universes)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Demo Credentials](#demo-credentials)
- [Quick Start — Backend](#quick-start--backend)
- [Quick Start — Frontend](#quick-start--frontend)
- [Environment Variables](#environment-variables)
- [API Overview](#api-overview)
- [Development Commands](#development-commands)
- [MySQL Migration (Production)](#mysql-migration-production)
- [Testing](#testing)
- [License](#license)

---

## Features

- **8 fandom universes** — Anime, Gaming, Movies & TV, K-Pop, Comics, Manga, Cosplay, and a Community Vault
- **Neo-Brutalist design** — hard 2-3px borders, tactile offset shadows, dual light/dark themes, monospace badges, and an `A-`/`A+` font scaler
- **Content explorer** — 6-tier filtering (keyword, type, category, genre, year, popularity) with multi-mode sorting
- **Rich-text article reader** — progress bar, key takeaways, star ratings, and inline personal collector notes
- **Stream & Discover vault** — 4K video trailers + OST/audio deck with waveform visualizer
- **Character lore roster** — interactive cards with a 2-fighter versus stat-comparison arena
- **Collector's Merchandise Vault** — showcase items with live UTC countdown timers and view telemetry (no checkout)
- **Convention radar** — interactive world map, geolocation filtering via Haversine, and `.ics` calendar export
- **FandomBot AI** — hybrid deterministic FAQ lookup with optional Gemini 2.5 Flash fallback
- **Role-based access** — Visitor / Member / Admin tiers with a moderated community submission workflow
- **Admin command center** — KPI telemetry, moderation queue with 1-click approve/reject, full CRUD across all entities

---

## Fandom Universes

| # | Universe | Slug | Accent Color | Core Focus |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **Anime** | `anime` | `#A3E635` (Acid Lime) | Seasonal simulcasts, sakuga breakdowns, character bios |
| 2 | **Gaming** | `gaming` | `#FACC15` (Cyber Yellow) | Patch metas, boss lore, speedrun highlights, co-op builds |
| 3 | **Movies & TV** | `movies-tv` | `#38BDF8` (Electric Cyan) | Cinematic universe timelines, 4K teasers, production diaries |
| 4 | **K-Pop** | `kpop` | `#F43F5E` (Hyper Rose) | Comeback calendars, MV streams, discographies, lightstick guides |
| 5 | **Comics** | `comics` | `#FB7185` (Crimson Coral) | Multiverse reading orders, variant covers, key issues |
| 6 | **Manga** | `manga` | `#FB923C` (Solar Orange) | Chapter trackers, mangaka spotlights, paneling analyses |
| 7 | **Cosplay** | `cosplay` | `#C084FC` (Neon Violet) | EVA foam blueprints, 3D printing guides, LED wiring |
| 8 | **Community Vault** | `community-vault` | `#34D399` (Emerald Mint) | Admin-vetted fan essays, canon theories, showcases |

---

## Project Structure

```
fanHubPlus/
├── Fanhub_frontend/          # React 19 + Vite + Tailwind CSS v4
│   ├── src/
│   │   ├── components/        # All UI components (Admin, Dashboard, Modals, etc.)
│   │   ├── services/          # API service layer with JWT injection
│   │   ├── hooks/             # Auth & utility hooks
│   │   ├── pages/             # Route-level pages
│   │   ├── styles/            # Tailwind directives & brutalist utilities
│   │   └── App.jsx / main.jsx
│   ├── vite.config.js         # Vite config with /api proxy to Django
│   └── package.json
├── fanHubPlus_backend/        # Django 5 + DRF + SimpleJWT
│   ├── fanhub/                # Project root (settings, urls, wsgi)
│   ├── accounts/              # Auth, profiles, dashboard, analytics
│   ├── fandoms/               # Categories, content, characters, stream media
│   ├── interactions/          # Bookmarks, notes, ratings, submissions, feedback
│   ├── merchandise/           # Non-transactional merch showcase
│   ├── events/                # Convention radar with Haversine geolocation
│   ├── chatbot/               # Deterministic FAQ + Gemini AI integration
│   ├── seed_data.py           # Pre-seeds DB with 8 universes + demo users
│   ├── seed_data.sql          # Standalone MySQL seed script
│   └── requirements.txt
├── DOCUMENTATION.md           # Full project documentation
└── README.md                  # This file
```

---

## Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19 + Vite 8 | Fast component rendering, modular hooks, instant HMR |
| **Styling** | Tailwind CSS v4 | Neo-brutalist utilities, dual themes, responsive grids |
| **Iconography** | Lucide React | High-contrast vector icons across all universes |
| **Routing** | React Router DOM v7 | Role-aware client-side routing |
| **Backend Framework** | Python 3 + Django 5 + DRF 3.18 | Modular REST API, ORM, data validation |
| **Authentication** | `djangorestframework-simplejwt` | Stateless JWT access/refresh with auto-refresh |
| **AI Integration** | `google-genai` + deterministic matcher | Sub-15ms FAQ lookup with optional Gemini 2.5 Flash |
| **Database** | SQLite3 / MySQL 8.0+ | Relational storage with JSON fields for character stats |
| **API Docs** | DRF Spectacular | Swagger/OpenAPI schema at `/api/docs/` |
| **Deployment** | Python `venv` + Vite build | Local dev servers; MySQL-compatible for production |

---

## Demo Credentials

| Role | Email | Password | Scope |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@fanhub.com` | `AdminPass123!` | Full `/admin` access, moderation queue, analytics |
| **Registered Collector** | `fan@fanhub.com` | `MemberPass123!` | Personalized `/dashboard` with bookmarks & notes |

---

## Quick Start — Backend

```powershell
# 1. Navigate to the backend directory
cd fanHubPlus_backend

# 2. Activate the virtual environment
.\venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Apply database migrations
python manage.py migrate

# 5. Seed the SQLite database with all 8 universes, content, characters, merch, events, FAQs & demo users
python manage.py seed_data

# 6. Start the Django development server
python manage.py runserver
```

The API will be available at `http://127.0.0.1:8000/api/`.

---

## Quick Start — Frontend

```powershell
# 1. Navigate to the frontend directory
cd Fanhub_frontend

# 2. Install dependencies
npm.cmd install

# 3. Start the Vite development server
npm.cmd run dev
```

The app will be available at `http://localhost:5173`. The Vite dev server proxies `/api` requests to the Django backend at `http://127.0.0.1:8000`.

---

## Environment Variables

### Backend (`.env` in `fanHubPlus_backend/`)

| Variable | Default | Description |
| :--- | :--- | :--- |
| `DEBUG` | `True` | Django debug mode |
| `SECRET_KEY` | — | Django secret key |
| `DATABASE_URL` | `sqlite:///db.sqlite3` | Database URL (overrides `DATABASES` if set) |
| `GEMINI_API_KEY` | — | Optional. Enables Gemini 2.5 Flash AI responses in FandomBot |
| `CORS_ALLOWED_HOSTS` | `*` | CORS origins for frontend |

### Frontend (`.env` in `Fanhub_frontend/`)

| Variable | Default | Description |
| :--- | :--- | :--- |
| `VITE_API_BASE_URL` | `http://127.0.0.1:8000/api` | Backend API base URL |

---

## API Overview

All endpoints are exposed under both `/api/` and `/api/v1/`. Swagger/OpenAPI docs are available at `/api/docs/`.

| Domain | Key Endpoints | Auth |
| :--- | :--- | :--- |
| **Auth & Accounts** | `POST /accounts/register/`, `POST /accounts/login/`, `POST /accounts/token/refresh/`, `GET /accounts/dashboard/`, `GET,PATCH /accounts/profile/`, `GET /accounts/admin/analytics/` | Public / Member / Admin |
| **Fandoms & Lore** | `GET /fandoms/categories/list/`, `GET /fandoms/categories/{slug}/`, `GET /fandoms/content/`, `GET /fandoms/content/{slug}/detail/`, `GET /fandoms/characters/`, `GET,POST /fandoms/stream-discover/`, `POST /fandoms/stream-discover/{slug}/rate/` | Public |
| **Interactions** | `GET /interactions/bookmarks/`, `POST /interactions/bookmarks/toggle/`, `PATCH /interactions/bookmarks/note/`, `GET,POST,DELETE /interactions/activity/`, `POST /interactions/ratings/`, `GET,POST /interactions/submissions/`, `POST /interactions/feedback/`, `PATCH /interactions/moderation/{id}/moderate/` | Member / Admin |
| **Merchandise** | `GET /merchandise/`, `GET /merchandise/upcoming/`, `POST /merchandise/{slug}/track-click/` | Public / Admin |
| **Events** | `GET /events/` | Public |
| **Chatbot** | `POST /chatbot/query/`, `GET /chatbot/history/` | Public |

See [`DOCUMENTATION.md`](./DOCUMENTATION.md) for the complete API specification.

---

## Development Commands

### Backend

```powershell
python manage.py makemigrations
python manage.py migrate
python manage.py seed_data        # Re-seed the database
python manage.py runserver        # Start dev server on port 8000
python manage.py admin            # Create superuser
```

### Frontend

```powershell
npm run dev          # Start Vite dev server (http://localhost:5173)
npm run build        # Production build
npm run lint         # Run ESLint
npm run preview      # Preview production build locally
```

---

## MySQL Migration (Production)

By default the project uses SQLite (`db.sqlite3`). To migrate to MySQL 8.0+:

1. Update `DATABASES['default']` in [`fanHubPlus_backend/fanhub/settings.py`](fanHubPlus_backend/fanhub/settings.py) to use `django.db.backends.mysql`.
2. Run `python manage.py migrate` to apply schemas to MySQL.
3. Import the standalone [`fanHubPlus_backend/seed_data.sql`](fanHubPlus_backend/seed_data.sql) script, or run `python manage.py seed_data` to populate.

---

## Testing

```bash
# Frontend linting & build verification
cd Fanhub_frontend
npm run lint
npm run build

# Backend (when test suites are available)
cd fanHubPlus_backend
python -m pytest
```

---

## License

This project is provided as-is for educational and portfolio purposes.
