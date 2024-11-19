FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

# Create a non-root user and group for the backend app
RUN addgroup --system backend && \
    adduser --system -G backend backend

# Set working directory inside the container
WORKDIR /app

# Copy the build output to the container
COPY dist/apps/backend ./

# Ensure the correct file permissions for the backend user
RUN chown -R backend:backend . 

# Install production dependencies (optional, if needed)
RUN npm --prefix backend --omit=dev -f install

# Use the backend directory entry point
CMD [ "node", "backend" ]

