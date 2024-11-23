# Base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dependenciess
COPY . ./

RUN npm install

# Build the NestJS application
RUN npx nx run backend:build

# Production image
FROM node:18-alpine AS production

WORKDIR /app

# Copy package.json and install production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy built application
COPY --from=base /app/dist/apps/backend ./dist
COPY apps/backend/.env  ./ 




# Start the application
CMD ["node", "dist/main.js"]
