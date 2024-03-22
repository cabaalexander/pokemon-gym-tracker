#### DEPENDENCIES

FROM node:current-alpine as deps

WORKDIR /app

COPY prisma .

COPY package.json .

RUN yarn --frozen-lockfile

#### BUILDER

FROM node:current-alpine as builder

WORKDIR /app

ARG DATABASE_URL=file:/app/data/db.sqlite

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN yarn build

RUN yarn db:push --accept-data-loss

#### RUNNER

FROM node:current-alpine as runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/next.config.js .
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/.next/standalone .
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/data/db.sqlite ./data/db.sqlite

#### OPTIONS

EXPOSE 3000

ENV DATABASE_URL=${DATABASE_URL}

LABEL org.opencontainers.image.source=https://github.com/cabaalexander/pokemon-gym-tracker

CMD ["node", "server.js"]
