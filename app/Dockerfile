FROM node:lts-alpine3.13

COPY --chown=node:node . /app/
WORKDIR /app

USER node

RUN npm install
