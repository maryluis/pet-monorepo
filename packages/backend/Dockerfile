FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN if [ -f .env ]; then cp .env .env; fi

RUN npm install --production

COPY lib ./lib

CMD ["node", "lib/index.js"]

EXPOSE 3001
