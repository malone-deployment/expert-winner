# Use the official Node.js image as a base image
FROM node:20.10.0 AS nx

# Install Nx globally
RUN npm install -g nx@19.6.5

# Set the working directory to the /workspace directory inside the container
WORKDIR /workspace

# Copy the entire workspace into the container
COPY . .

# Install dependencies (assuming the Nx workspace has package.json)
RUN npm install

# Build the backend application
RUN npx nx build backend

# Set the final image for the backend (this step can vary depending on how you want to run the app)
FROM node:20.10.0 AS backend

# Set the working directory for the final container image
WORKDIR /app

# Copy the built backend files from the previous stage (nx build backend)
COPY --from=nx /workspace/dist/apps/backend ./ 

# Install production dependencies
RUN npm install --production

# Expose port 3000 to be accessible from outside the container
EXPOSE 3000

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000

# Run the backend application
CMD ["node", "backend"]
