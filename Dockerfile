# ============================================
# Stage 1: Builder - Build the application
# ============================================
FROM node:22 AS builder

WORKDIR /app

# Copy package files first for better caching
COPY package.json yarn.lock ./

# Install dependencies (this layer will be cached if package.json/yarn.lock don't change)
RUN yarn install --frozen-lockfile --production=false
RUN yarn cache clean
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
RUN yarn build

# ============================================
# Stage 2: Runtime - Minimal production image
# ============================================
FROM node:22-slim AS runtime

WORKDIR /app

# Copy package files
COPY package.json yarn.lock ./

# Install ONLY production dependencies
RUN yarn install --frozen-lockfile --production=true
RUN yarn cache clean
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

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:4321', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "./dist/server/entry.mjs"]
