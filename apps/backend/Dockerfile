# Base image
FROM node:18-alpine AS base


# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./

RUN npm install

# Copy the source code
COPY . .

# Build the NestJS application
RUN npx nx run backend:build




# Production image
FROM node:18-alpine AS production
ENV PORT=8080
WORKDIR /app


# Copy package.json and install production dependencies
COPY package*.json ./
RUN npm install --production

# Copy built application
COPY --from=base /app/dist/apps/backend ./dist

EXPOSE 8080
# Start the application
CMD ["node", "dist/main.js"]
