FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY .env .env

RUN npm install --production

COPY lib ./lib

CMD ["node", "lib/index.js"]

EXPOSE 3001