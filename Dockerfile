# syntax=docker/dockerfile:1

FROM node:current
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm ci --only=production

COPY . .

RUN apt-get update && apt-get install -y docker.io && rm -rf /var/lib/apt/lists/*

EXPOSE 3000/tcp

CMD [ "node", "index.js" ]

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD curl -f http://localhost:3000/ps || exit 1
