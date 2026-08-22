# syntax=docker/dockerfile:1

# --- Build stage: full toolchain, compile TypeScript to dist/ ---
FROM node:24 AS builder
WORKDIR /usr/src/app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# --- Deps stage: production-only node_modules ---
FROM node:24 AS deps
WORKDIR /usr/src/app
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --prod

# --- Runtime stage: slim image, no dev deps, no source ---
FROM node:24-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production
RUN corepack enable
COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY --chown=node:node --from=deps /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=builder /usr/src/app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/main"]
