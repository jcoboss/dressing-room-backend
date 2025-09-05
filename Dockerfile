# Node.js image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Copy .env.example to .env if .env doesn't exist
COPY .env.example .env

# Expose port
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
