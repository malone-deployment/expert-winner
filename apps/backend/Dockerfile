# Base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./
COPY workspace.json ./
COPY libs/ ./libs/
COPY apps/ ./apps/
RUN npm install

# Build the NestJS application
RUN npm run build --workspace=<your-app-name>

# Production image
FROM node:18-alpine AS production

WORKDIR /app

# Copy package.json and install production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built application
COPY --from=base /app/dist/apps/<your-app-name> ./dist

# Expose application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/main.js"]
