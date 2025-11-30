FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm
RUN corepack enable

# Copy package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile || npm install

COPY . .

# Build static assets
RUN pnpm build || npm run build

FROM node:20-alpine AS runner

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/.out ./.out
COPY --from=builder /app/out ./out
COPY --from=builder /app/build ./build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

ENV PORT=3000

EXPOSE 3000

CMD ["sh", "-c", "serve -s .out -l ${PORT:-3000} || serve -s out -l ${PORT:-3000} || serve -s build -l ${PORT:-3000}"]
