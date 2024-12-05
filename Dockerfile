# syntax=docker/dockerfile:1

FROM node:current-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci --only=production

COPY . .

EXPOSE 3000/tcp

CMD [ "node", "index.js" ]