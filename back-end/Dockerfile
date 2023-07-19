FROM node:latest

RUN mkdir -p /app

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install && yarn cache clean

COPY . .

EXPOSE 5000

CMD ["yarn", "dev"]
