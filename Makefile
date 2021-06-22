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

test:
	@echo -n "healthcheck: "
	@curl 'http://localhost:12000/healthcheck'
	@echo -en "\ntoken: "
	@curl 'http://localhost:12000/token'

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
	prebuild \
	test
