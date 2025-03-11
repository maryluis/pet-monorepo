FROM node:19.5.0-alpine

WORKDIR /app

COPY . .

RUN rm -rf ./packages/backend

WORKDIR /app/packages/frontend

RUN npm install --legacy-peer-deps

RUN npm run build

EXPOSE 4173


CMD ["npm", "run", "start"]
