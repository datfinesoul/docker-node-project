FROM node:lts-alpine3.13

RUN apk add \
	curl

COPY --chown=node:node . /app/
WORKDIR /app

USER node

RUN npm install
