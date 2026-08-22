# Maskan — Frontend

Apartment listing web app built with **Next.js (App Router) + TypeScript**, **Tailwind CSS**, **React Query**, and **Headless UI**. It consumes the apartments API from the `backend` service.

## Pages

- `/` — **List apartments**: paginated grid of listings with loading / error / empty states. Page is synced to the URL (`?page=`). Search + filters are shown as placeholders (the API currently exposes only an `areaId` filter).
- `/apartments/[id]` — **Apartment details**: cover photo, key facts, description, amenities, payment plans, and an OpenStreetMap location preview, with a sticky summary card.

## Structure

Feature-first, one folder per use case:

```
src/
  app/                         # Next.js routes (thin — wire a URL to a feature)
    page.tsx                   #   /            -> list
    apartments/[id]/page.tsx   #   /apartments/:id -> details
    providers.tsx              #   React Query provider
  features/
    list-apartments/
      api/                     # useListApartments (React Query hook)
      components/              # cards, list, pagination, sidebar, view
      types/
    apartment-details/
      api/                     # useGetApartment
      components/
      types/
  shared/
    api/                       # axios instance + shared envelope types
    components/                # header, container, breadcrumb, icons
    lib/                       # formatters
```

## Configuration

Client env vars are inlined at build time (`NEXT_PUBLIC_*`). Defaults work out of the box for the docker-compose setup.

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` | `http://localhost:3000/api` | Backend base URL, called from the browser. |
| `NEXT_PUBLIC_MEDIA_HOST` | `prod-images.cooingestate.com` | Allowed host for `next/image` remote images. |

## Local development

```bash
pnpm install
pnpm dev -p 3001   # backend runs on 3000
```

Open http://localhost:3001.

## Docker

The frontend is part of the root `docker-compose.yml`. From the repo root:

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
