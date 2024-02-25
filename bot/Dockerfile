# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory within the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install project dependencies using Yarn
RUN yarn install 

# Copy the rest of the application code to the working directory
COPY . .

# Command to start your application
CMD ["yarn", "cleanStart"]