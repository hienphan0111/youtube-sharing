FROM node

RUN mkdir -p /src

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm","run", "dev" ]