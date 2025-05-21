FROM node:16

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json if exists
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all application files
COPY . .

# Expose application port (change if you use a different one)
EXPOSE 8000

# Command to start your app
CMD ["npm", "start"]
