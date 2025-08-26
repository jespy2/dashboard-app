# Stage1: Build
FROM node:20-alpine AS builder

# Set working dir
WORKDIR /app

# Install deps (only package.json + lockfiles for cache)
COPY package*.json ./
RUN npm install --frozen-lockfile

# copy rest of source and builder
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built artifacts from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Install only production deps
RUN npm install --omit=dev --frozen-lockfile

# Expose and run
EXPOSE 3000
CMD ["npm", "run", "start"]