FROM node:18-alpine

RUN apk add --no-cache make gcc g++ python3 git pkgconfig

RUN mkdir /app
COPY . /app

WORKDIR /app

RUN npm ci

RUN npm run build-prod

CMD node ./build/index.js

