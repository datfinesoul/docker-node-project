project = docker-node-project
main: run

run: build
	docker run \
		--rm \
		-p 10000:5000/tcp \
		"$(project):latest"

build:
	docker build \
		-t "$(project):latest" \
		.

rebuild:
	docker build \
		--no-cache \
		-t "$(project):latest" \
		.

save: build
	docker save "$(project):latest" -o "$(project).tar"

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

.PHONY: main run build rebuild save web lint line_one hado
