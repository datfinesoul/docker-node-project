FROM node:lts-alpine3.13

RUN apk add \
	curl

# 1. create a directory called /app/ if it doesn't exist
# 2. copy the package*.json files (usually 1 or 2) into /app/
# 3. make the owner of all files in the directory the 'node' user
COPY --chown=node:node package*.json /app/

# This changes the directory and makes it the default
WORKDIR /app

# switch to the 'node' user
USER node

# Run 'npm install'
RUN npm install
# Now copy all the application code
# - Doing this after npm install saves build time on future updates
# - The .dockerignore file will cover not overwriting node_modules
COPY --chown=node:node . .
