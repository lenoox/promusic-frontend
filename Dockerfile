FROM node:16 as build
WORKDIR /app

ARG PROFILE_ACTIVE

RUN npm install -g npm
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build:$PROFILE_ACTIVE

FROM nginx:1.21.6-alpine
COPY --from=build /app/dist/promusic /usr/share/nginx/html/
COPY --from=build /app/default.conf /etc/nginx/conf.d/
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
