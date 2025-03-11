FROM node:18-alpine

WORKDIR /app

COPY . .

RUN rm -rf ./packages/backend

WORKDIR /app/packages/frontend

RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
  
RUN apt-get install -y nodejs

RUN npm install --legacy-peer-deps

RUN npm run build

EXPOSE 4173


CMD ["npm", "run", "start"]
