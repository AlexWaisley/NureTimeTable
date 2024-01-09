FROM node:18-alpine AS build
WORKDIR /src
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine-slim AS publish
COPY --from=build /src/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]