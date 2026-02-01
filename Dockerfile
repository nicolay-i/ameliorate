# syntax=docker/dockerfile:1

FROM node:24.11.1-bookworm-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Prisma engines require OpenSSL at runtime/build time.
RUN apt-get update -y \
	&& apt-get install -y --no-install-recommends openssl \
	&& rm -rf /var/lib/apt/lists/*


FROM base AS deps

# Install dependencies (includes prisma generate via postinstall).
COPY package.json package-lock.json ./
COPY prisma.config.ts ./
COPY src/db/schema.prisma ./src/db/schema.prisma

RUN npm ci


FROM base AS builder
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# `src/db/generated` is created during `npm ci` (postinstall -> prisma generate) in the deps stage.
# It's not guaranteed to be present in the build context, so copy it from deps.
COPY --from=deps /app/src/db/generated ./src/db/generated

RUN npm run build


FROM base AS runner
ENV NODE_ENV=production

RUN useradd --uid 1001 --create-home nodeapp
USER nodeapp

EXPOSE 3000

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

CMD ["npm", "run", "start"]
