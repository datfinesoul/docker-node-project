FROM node:lts-alpine3.13

COPY --chown=node:node . /app/
WORKDIR /app

USER node

RUN npm install
	#&& cat .git/HEAD \
	#| cut -d' ' -f2 \
	#| xargs -I {} cat ".git/{}" \
	#| jq -cRM '{sha: .}' \
	#> ./.ref.json

