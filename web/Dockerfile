FROM node:lts-alpine3.13

WORKDIR /app

COPY . .
RUN npm install
	#&& cat .git/HEAD \
	#| cut -d' ' -f2 \
	#| xargs -I {} cat ".git/{}" \
	#| jq -cRM '{sha: .}' \
	#> ./.ref.json

