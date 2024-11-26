# Base image
FROM node:18-alpine AS base

# Define build arguments
ARG DB_HOST
ARG DB_PORT
ARG DB_USER
ARG DB_PASS
ARG DB_NAME

# Set environment variables inside the container
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_USER=${DB_USER}
ENV DB_PASS=${DB_PASS}
ENV DB_NAME=${DB_NAME}

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




# Start the application
CMD ["node", "dist/main.js"]
