FROM node:18-alpine AS build
WORKDIR /app/src
COPY portfolioProject/package*.json ./
COPY portfolioProject/angular.json ./
COPY portfolioProject/tsconfig*.json ./
COPY portfolioProject/src ./src
COPY portfolioProject/server.ts ./
RUN npm ci
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/app
COPY --from=build /app/src/dist/portfolio-project ./
CMD node server/server.mjs
EXPOSE 4000