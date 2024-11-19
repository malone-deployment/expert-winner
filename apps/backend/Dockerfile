# Use the official Node.js image as a base image for building the application
FROM node:20.10.0 AS nx

# Install Nx globally to handle Nx workspace commands
RUN npm install -g nx@19.6.5

# Set the working directory to /workspace inside the container
WORKDIR /workspace

# Copy the entire workspace into the container (this includes the package.json)
COPY . .

# Install dependencies from the package.json file
RUN npm install

# Build the backend application using Nx
RUN npx nx build backend

# ----------------------------------------------
# Final image for running the backend application
FROM node:20.10.0 AS backend

# Set the working directory for the final container image
WORKDIR /app

# Copy the built backend files from the previous build stage
COPY --from=nx /workspace/dist/apps/backend ./ 

# Install production dependencies (needed for running the backend)
WORKDIR /workspace
COPY package.json .
RUN npm install --production

# Expose port 3000 for the backend service
EXPOSE 3000

# Set environment variables for the application
ENV HOST=0.0.0.0
ENV PORT=3000

# Command to run the backend application
CMD ["node", "backend"]
