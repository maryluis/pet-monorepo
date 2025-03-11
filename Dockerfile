FROM node:18-alpine

WORKDIR /app

COPY packages ./packages

WORKDIR /app/packages/frontend

RUN npm install --legacy-peer-deps --prefix /app/packages/frontend

RUN npm run build

EXPOSE 4173


CMD ["npm", "run", "start"]
