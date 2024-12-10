FROM node:18-alpine AS build
WORKDIR /app/src
COPY package*.json ./
COPY angular.json ./
COPY tsconfig*.json ./
COPY src ./src
COPY server.ts ./
RUN npm ci
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/app
COPY --from=build /app/src/dist/portfolio-project ./
CMD node server/server.mjs
EXPOSE 4000