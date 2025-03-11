FROM node:19.5.0-alpine

WORKDIR /app

COPY packages ./packages

RUN rm -rf ./packages/backend

WORKDIR /app/packages/frontend

RUN npm install --legacy-peer-deps --prefix /app/packages/frontend

RUN npm run build

EXPOSE 4173


CMD ["npm", "run", "start"]
