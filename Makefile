SHELL=/bin/bash
project = docker-node-project
main: up

up:
	docker-compose up --build

prebuild:
	npx standard --fix app/
	npx standard --fix web/

shell:
	docker-compose exec app sh

lint:
	docker pull "github/super-linter:latest"
	docker run \
		-e RUN_LOCAL=true \
		-v "$(shell pwd):/tmp/lint" \
		"github/super-linter"

lint_one:
ifdef file
	docker pull github/super-linter:latest
	docker run \
		-e RUN_LOCAL=true \
		-v $(shell pwd)/$(file):/tmp/lint/$(file) \
		github/super-linter
else
	@echo No file provided
endif

hado:
	docker run --rm -i hadolint/hadolint < ./app/Dockerfile
	docker run --rm -i hadolint/hadolint < ./web/Dockerfile

.PHONY: main \
	lint \
	line_one \
	hado \
	up \
	shell \
	prebuild
