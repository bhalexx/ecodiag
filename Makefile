DC=docker compose
PROJECT_DIR=/symfony
RUN=$(DC) run --rm
RUN_SERVER=$(RUN) -w $(PROJECT_DIR)/api
EXEC=$(DC) exec
SERVER_CONSOLE=$(EXEC) php server/bin/console
PASS_PHRASE?=ecodiag
VERSION?=
SUITE?=
ENV?=dev

.DEFAULT_GOAL := help
.PHONY: help start stop build up restart cc install config

check_defined = \
    $(strip $(foreach 1,$1, \
        $(call __check_defined,$1,$(strip $(value 2)))))
__check_defined = \
    $(if $(value $1),, \
        $(error Undefined $1$(if $2, ($2))$(if $(value @), \
                required by target `$@')))

help:
	@grep -E '(^([a-zA-Z_.-]+ ?)+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-20s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

##
## Project
##---------------------------------------------------------------------------

start:          ## Install and start the project
start: config build vendor up

stop:           ## Remove docker containers
	@echo "Stopping containers"
	@$(DC) stop > /dev/null
	@$(DC) rm -v --force > /dev/null
	@echo "Containers stopped"

restart:          ## Restart the whole project
restart: stop start

install:        ## Install the whole project
install: start

cc:             ## Clear the cache in dev env
cc: clean-dir
	@$(EXEC) php php -d memory_limit=-1 server/bin/console cache:warmup --env $(ENV)

clean-dir:      ## Clean directories
clean-dir:
	@rm -rf $(filter-out server/var/data.db,$(wildcard server/var/*))

config:         ## Init files required
config: .env compose.override.yaml server/.php-cs-fixer.php client/.env #client/projects/common/environment/environment.ts
	@echo 'Configuration files copied'

##
## DB
##---------------------------------------------------------------------------

db-diff:        ## Generation doctrine diff
	@$(SERVER_CONSOLE) doctrine:migrations:diff

db-migrate:     ## Launch doctrine migrations
ifneq ($(VERSION),)
	@$(SERVER_CONSOLE) doctrine:migrations:migrate DoctrineMigrations\\Version$(VERSION) --no-interaction
else
	@$(SERVER_CONSOLE) doctrine:migrations:migrate --no-interaction
endif

db-reset:       ## Reset database with given DUMP variable
	@:$(call check_defined, DUMP, sql file)
	@echo 'Reseting database'
	@$(EXEC) mariadb reset $(DUMP) > /dev/null

db-save:        ## Save database to a sql file
	@:$(call check_defined, DUMP, sql file)
	@echo 'Saving database'
	@$(EXEC) mariadb save $(DUMP) > /dev/null

##
## Tools
##---------------------------------------------------------------------------
#stan:           ## Execute phpstan
#	@$(EXEC) php server/vendor/bin/phpstan analyze -c server/phpstan.neon --xdebug
#
#rector:         ## Process rector
#	@$(EXEC) -w /$(PROJECT_DIR)/server php vendor/bin/rector process
#
#rector-preview: ## Process rector preview
#	@$(EXEC) -w /$(PROJECT_DIR)/server php vendor/bin/rector process --dry-run

##
## Dependencies
##---------------------------------------------------------------------------

# Internal rules

vendor:         ## Server and client
vendor: server/vendor client/node_modules
	@echo "Vendors installed"

build:
	@echo "Building images"
	@$(DC) build > /dev/null

up:
	@echo "Starting containers"
	@$(DC) up -d --remove-orphans

tslint:         ## Run TSLint on client
	@$(EXEC) client yarn run lint

# Single file dependencies
.env: .env.dist
	@echo "Copying docker environment variables"
	@cp .env.dist .env
	@sed -i "s/^APP_USER_ID=.*/APP_USER_ID=$(shell id -u)/" .env
	@sed -i "s/^APP_GROUP_ID=.*/APP_GROUP_ID=$(shell id -g)/" .env
	@sed -ri "s#^(XDEBUG_FILE_LINK_FORMAT=.*)#\1$(shell pwd)#" .env

compose.override.yaml: compose.override.yaml.dist
	@echo "Copying docker configuration"
	@cp compose.override.yaml.dist compose.override.yaml
server/vendor: server/composer.lock
	@echo "Installing server dependencies"
	@$(RUN_SERVER) php php -d memory_limit=-1 /usr/local/bin/composer install --no-interaction
	@#$(RUN_SERVER) php bin/console messenger:setup-transports
#server/.php-cs-fixer.php: server/.php-cs-fixer.dist.php
#	@cp server/.php-cs-fixer.dist.php server/.php-cs-fixer.php
client/node_modules: client/yarn.lock
	@echo "Installing client dependencies"
	@$(RUN) client yarn install
client/.env: client/.env.dist
	@echo "Copying client environment variables"
	@cp client/.env.dist client/.env
#	@read -p "FONTAWESOME_NPM_AUTH_TOKEN ? " fontawesome; \
#        sed -i -e "s/FONTAWESOME_NPM_AUTH_TOKEN=/FONTAWESOME_NPM_AUTH_TOKEN=$$fontawesome/" client/.env
#client/projects/common/environment/environment.ts: client/projects/common/environment/environment.ts.dist
#	@echo "Copying client configuration"
#	@cp client/projects/common/environment/environment.ts.dist client/projects/common/environment/environment.ts
