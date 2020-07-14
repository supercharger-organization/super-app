FROM node:10-alpine as builder

COPY package.json ./
RUN npm install && mkdir /ng-app && mv ./node_modules ./ng-app
WORKDIR /ng-app
COPY . .
RUN npm run build-prod

FROM nginx:1.14.1-alpine

RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*
RUN apk add bash

COPY nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /ng-app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]