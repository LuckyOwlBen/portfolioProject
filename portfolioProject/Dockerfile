FROM node:18-alpine as build
WORKDIR /app/src
COPY package*.json ./
RUN npm ci
COPY . ./
ARG apiUrl
ENV apiUrl=${API_URL}
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/app
COPY --from=build /app/src/dist/portfolio-project ./
CMD node server/server.mjs
EXPOSE 4000