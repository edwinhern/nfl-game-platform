# Base stage with pnpm setup
FROM node:23.9.0-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

# Production dependencies stage
FROM base AS prod-deps
COPY package.json pnpm-lock.yaml ./
# Install only production dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

# Build stage - install all dependencies and build
FROM base AS build
COPY package.json pnpm-lock.yaml ./
# Install all dependencies (including dev dependencies)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
# Copy source code
COPY . .
# Build the application
RUN pnpm run build

# Final stage - combine production dependencies and build output
FROM node:23.9.0-alpine
WORKDIR /app
# Set NODE_ENV environment variable
ENV NODE_ENV=production
# Copy the bundled code from the builder stage
COPY --from=prod-deps --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist

# Use the node user from the image
USER node

# Expose the port
EXPOSE 8080

# Start the server
CMD ["node", "dist/main.js"]
