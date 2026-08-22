# Apartments

- **Backend**: NestJS (TypeScript), PostgreSQL via TypeORM
- **Frontend**: Next.js (App Router), React Query, Tailwind CSS
- **Infra**: Docker Compose (frontend + backend + Postgres)

## Features

- **Listing page**: paginated apartment cards with a sidebar of data-driven filters (sale type, bedrooms, price range, area range). Filter bounds come from the data itself, so the ranges always match what is in the database.
- **Filters in the URL**: every filter and the current page live in the query string, so a filtered view is shareable and survives a refresh.
- **Detail page**: full unit view: gallery image, key facts, description, amenities, payment plans, and an embedded location map.
- **Add apartment**: `POST` endpoint with validation for creating a listing.
- **Responsive**: works on mobile and desktop; filters collapse into a bottom-sheet on small screens.
- **API documentation**: interactive reference generated from the code.

## Quick start

Requires Docker and Docker Compose. From the repo root:

```bash
docker compose up --build
```

This builds all images, starts Postgres, runs migrations, seeds the database, and launches both apps. First boot takes a minute while the database seeds.

Then open **http://localhost:3000**. or  **http://localhost:3001/reference** for APIs

To stop and remove everything (including the database volume):

```bash
docker compose down -v
```

## How it runs

The three services start in a fixed order, each waiting for the previous one to be **healthy** (not merely started), so the stack never races ahead of its dependencies.

```
db  ▶ (healthy)  backend  ▶ (healthy)  frontend
```

1. **`db`** (Postgres) comes up first. Its healthcheck runs `pg_isready` until the database actually accepts connections. Data lives in the `db_data` named volume, so it survives `docker compose down` (but not `down -v`).
2. **`backend`** waits for `db` to be healthy (`depends_on: condition: service_healthy`), then runs its startup command in order:

   ```
   pnpm migration:run:prod   # apply any pending migrations
   && pnpm seed:prod         # load sample data
   && node dist/main         # start the API
   ```

   Migrations and seeding are **automatic**; there is no manual step. Migrations are idempotent: only pending ones apply, so restarts are safe. The backend then exposes its own healthcheck at `/api/health`, which is what gates the frontend.
3. **`frontend`** waits for `backend` to report healthy before it starts, so the app is never served before the API is ready to answer.

## Services & URLs

| Service     | URL                              | Notes                                                     |
| ----------- | -------------------------------- | --------------------------------------------------------- |
| Frontend    | http://localhost:3000            | Next.js app                                               |
| Backend API | http://localhost:3001/api        | REST, prefixed with`/api`                               |
| API docs    | http://localhost:3001/reference  | Interactive reference (Scalar)                            |
| Health      | http://localhost:3001/api/health | Liveness/readiness probe                                  |
| Postgres    | localhost:5434                   | user/pass/db:`postgres` / `postgres` / `apartments` |

## API

Base URL: `http://localhost:3001/api`. Every response is wrapped in a common envelope (`data`, `message`, `errorCode`, `referenceId`).

| Method   | Path                    | Description                                      |
| -------- | ----------------------- | ------------------------------------------------ |
| `GET`  | `/apartments`         | List apartments, paginated and filtered          |
| `GET`  | `/apartments/filters` | Filter bounds (price, area, bedrooms) for the UI |
| `GET`  | `/apartments/:id`     | Full detail for one apartment                    |
| `POST` | `/apartments`         | Create an apartment                              |
| `GET`  | `/health`             | Service health                                   |

**List query parameters** (all optional): `area`, `compound`, `developer`, `saleType`, `minBedrooms`, `minPrice`, `maxPrice`, `minArea`, `maxArea`, `page` (default `1`), `limit` (default `12`, max `50`).

See the [interactive reference](http://localhost:3001/reference) for full request/response schemas.

## Project structure

```
.
├── backend/            NestJS API
│   └── src/
│       ├── domain/         TypeORM entities and enums
│       ├── features/       Feature slices (apartments, health)
│       ├── infrastructure/ Database, migrations, seeds
│       ├── shared/         Cross-cutting: http envelope, logging, media, config
│       └── config/         Environment validation
├── frontend/           Next.js app
│   └── src/
│       ├── app/            Routes, layout, error boundary
│       ├── features/       Feature slices (list-apartments, apartment-details)
│       └── shared/         Reusable components, api client, lib
├── docker-compose.yml
```

Both apps follow a **feature-sliced** layout: each feature owns its components, API calls, types, and logic. The backend groups each use case (list, get, create, filter-ranges) with its own handler, request/response DTOs, and mapper.

## Testing

The backend has unit and integration tests. Integration tests spin up a real Postgres in a throwaway container (Testcontainers), so Docker must be running.

```bash
cd backend  # requires Docker
pnpm test               # everything
```
