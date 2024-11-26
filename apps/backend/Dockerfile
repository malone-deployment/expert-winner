# Base image for the build stage
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available) to install dependencies
COPY package*.json ./

# Install all dependencies (including dev dependencies for build)
RUN npm install

# Copy the rest of the application
COPY . .

# Build the NestJS application
RUN npx nx run backend:build

# Production image
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Copy package.json and install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built application from the base stage
COPY --from=base /app/dist/apps/backend ./dist

# Copy other necessary files (e.g., environment files, assets, etc.)
# COPY . .

# Set environment variable for Cloud SQL (optional, can be passed during deploy)
# ENV NODE_ENV=production

# Start the application
CMD ["node", "dist/main.js"]
