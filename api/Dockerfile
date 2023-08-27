# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port that the application runs on
# Should match port in config file
EXPOSE 14200 

# Command to start the application
CMD [ "yarn", "start" ]