# ============================================
# Stage 1: Builder - Build the application
# ============================================
FROM node:24 AS builder

WORKDIR /app

# Enable pnpm via corepack (version pinned by package.json "packageManager")
RUN corepack enable

# Copy manifest + lockfile + workspace config first for better caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies (this layer is cached if the manifest/lockfile don't change)
RUN pnpm install --frozen-lockfile
RUN pnpm store prune
RUN rm -rf /tmp/* /var/lib/apt/lists/*

# Copy source files
COPY . .

# Build-time environment variables
# Authentication & OAuth
ARG AUTH_SECRET
ARG PUBLIC_AUTH_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG AZURE_AD_CLIENT_ID
ARG AZURE_AD_CLIENT_SECRET
ARG AZURE_AD_TENANT_ID

# Application URLs (the ONLY variables that differ between environments)
# IMPORTANT: PUBLIC_ prefix makes these available to client-side code (browser)
ARG PUBLIC_API_BASE_URL        # API Backend + WebSocket
ARG PUBLIC_FRONTEND_BASE_URL   # Frontend application

# Set environment variables for build process
ENV AUTH_SECRET=${AUTH_SECRET}
ENV PUBLIC_AUTH_SECRET=${PUBLIC_AUTH_SECRET}
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
ENV AZURE_AD_CLIENT_ID=${AZURE_AD_CLIENT_ID}
ENV AZURE_AD_CLIENT_SECRET=${AZURE_AD_CLIENT_SECRET}
ENV AZURE_AD_TENANT_ID=${AZURE_AD_TENANT_ID}
ENV PUBLIC_API_BASE_URL=${PUBLIC_API_BASE_URL}
ENV PUBLIC_FRONTEND_BASE_URL=${PUBLIC_FRONTEND_BASE_URL}

# Build the application
RUN pnpm build

# ============================================
# Stage 2: Runtime - Minimal production image
# ============================================
FROM node:24-slim AS runtime

WORKDIR /app

# Enable pnpm via corepack (version pinned by package.json "packageManager")
RUN corepack enable

# Copy manifest + lockfile + workspace config
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Install ONLY production dependencies
RUN pnpm install --frozen-lockfile --prod
RUN pnpm store prune
RUN rm -rf /tmp/* /var/lib/apt/lists/* /root/.cache /var/cache/apt/*

# Copy built application from builder stage
COPY --from=builder /app/dist ./dist

# Runtime environment variables
# Authentication & OAuth
ARG AUTH_SECRET
ARG PUBLIC_AUTH_SECRET
ARG GOOGLE_CLIENT_ID
ARG GOOGLE_CLIENT_SECRET
ARG AZURE_AD_CLIENT_ID
ARG AZURE_AD_CLIENT_SECRET
ARG AZURE_AD_TENANT_ID

# Application URLs (the ONLY variables that differ between environments)
# IMPORTANT: PUBLIC_ prefix makes these available to client-side code (browser)
ARG PUBLIC_API_BASE_URL        # API Backend + WebSocket
ARG PUBLIC_FRONTEND_BASE_URL   # Frontend application

# Set runtime environment variables
ENV AUTH_SECRET=${AUTH_SECRET}
ENV PUBLIC_AUTH_SECRET=${PUBLIC_AUTH_SECRET}
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
ENV AZURE_AD_CLIENT_ID=${AZURE_AD_CLIENT_ID}
ENV AZURE_AD_CLIENT_SECRET=${AZURE_AD_CLIENT_SECRET}
ENV AZURE_AD_TENANT_ID=${AZURE_AD_TENANT_ID}
ENV PUBLIC_API_BASE_URL=${PUBLIC_API_BASE_URL}
ENV PUBLIC_FRONTEND_BASE_URL=${PUBLIC_FRONTEND_BASE_URL}

# Server configuration
ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production

# Use non-root user for security
USER node

EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]
