#!/bin/bash

# Define variables
IMAGE_NAME="chiquita"
TAG="latest"
USERNAME="jaimenufio"

# Step 1: Build Docker Image
docker build -t $IMAGE_NAME:$TAG .

# Step 2: Tag the Docker Image for Docker Hub
docker tag $IMAGE_NAME:$TAG $USERNAME/$IMAGE_NAME:$TAG

# Step 3: Push Docker Image to Docker Hub
docker push $USERNAME/$IMAGE_NAME:$TAG