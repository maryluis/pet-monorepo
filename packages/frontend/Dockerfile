FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN if [ -f .env ]; then cp .env .env; fi

RUN npm install --legacy-peer-deps`

COPY dist ./dist

CMD ["npm", "run", "start"]

EXPOSE 4173
