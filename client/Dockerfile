FROM node:18-alpine

RUN mkdir -p /src

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "dev" ]