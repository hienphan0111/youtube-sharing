FROM node:alpine

RUN mkdir -p /src

WORKDIR /src

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 5173

CMD [ "npm", "run", "dev" ]