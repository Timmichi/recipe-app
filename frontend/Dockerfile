FROM node:20-alpine
LABEL maintainer="timmichi.github.io"
WORKDIR /frontend/app

# Install dependencies first (including dev dependencies)
COPY package*.json ./
RUN npm cache clean --force && \
    rm -rf node_modules && \
    npm install

# Then copy the rest of the application
COPY . .

# Set environment variables
ENV HOST=0.0.0.0
EXPOSE 5173

# Use npm script to run vite
CMD ["npm", "run", "dev"]