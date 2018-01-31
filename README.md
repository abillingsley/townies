# ReadMe

## Code Organization

* api
* config
* deployment
* infrastructure
* native
* scripts
* web
* .env
* .envrc
* .node-version
* Dockerfile.api
* Dockerfile.web
* package.json
* sonar-project.properties
* townies
* tsconfig.json
* tslint.json
## Getting Started with Docker

1.  [Install Docker](https://www.docker.com/products/overview)
2.  Run `./townies dev start`
3.  Run `open localhost:8080`

# Development

## Starting the Development Environment

1. `brew install direnv`
2. `direnv allow`
3. run `./townies dev start`
4. Run `open localhost:8080`

NOTE: for zsh users

* Add `eval "$(direnv hook zsh)"` to `~/.zshrc`

## Debugging

[Node inspector](https://nodejs.org/en/docs/inspector) is for debugging.  We use the default port 9229 for debugging so you can use your favorite debugging tools to connect to the server.

### Using Chrome

1. open `chrome://inspect/` in your chrome browser
2. Under Remote Targets choose `inspect`

## Data Seeds

### Creating a seed file

Run `(cd infrastructure && yarn run db:generate:seed --name the_name_of_the_seed)`

### Applying a seed file

Run `(cd infrastructure && yarn run db:seed)`

## Data Migration

### Creating a migration

Run `(cd infrastructure && yarn run db:generate:migration --name the_name_of_the_migration)`

### Applying a migration

Run `(cd infrastructure && yarn run db:migrate)`

> the database is automatically migrated when the server is started for the first time
> and when the tests are run

### Rollback a migration

Run `(cd infrastructure && yarn run db:migrate:rollback)`

## Test

### Using a File Watcher

1. Start the development environment (`./townies dev start`)
2. Run `./townies dev test`

## Updating Front End API Client

1. Start the development environment (`./townies dev start`)
2. Run `sh ./scripts/update_api_client.sh`
