FROM node:9-slim
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn install --ignore-engines
COPY . /app
CMD ["yarn","cleanStart"]