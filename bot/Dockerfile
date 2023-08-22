# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory within the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install project dependencies using Yarn
RUN yarn install --ignore-engines

# Copy the rest of the application code to the working directory
COPY . .

# # Expose the port your application runs on
# EXPOSE 3000

ENV CONFIG_FILE=LOREMIPSUM

# Command to start your application
CMD ["yarn", "CleanStart"]