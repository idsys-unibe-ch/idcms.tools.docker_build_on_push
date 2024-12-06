# syntax=docker/dockerfile:1

FROM node:current-alpine
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci --only=production

COPY . .

EXPOSE 3000/tcp

CMD [ "node", "index.js" ]

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD curl -f http://localhost:3000/ps || exit 1
