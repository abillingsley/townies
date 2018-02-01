# ReadMe

## Code Organization

```
project/
├── core/
│   ├── interfaces
│   └── domain-concept/
│       ├── entities
│       ├── domain services
│       └── request-response
├── config/
├── api/
│   ├── web framework
│   └── app services
├── deployment/
│   ├── development/
│   ├── k8s/
│   ├── rancher/
│   └── xyz_tool/
├── infrastructure/
│   ├── logging/
│   ├── postgres/
│   ├── in_memory/
│   └── xyz_implementation/
├── native/
├── scripts/
│   ├── sync_swagger_api.sh
│   └── utility things
├── web/
│   └── front end things
├── .env
├── .envrc
├── .node-version
├── Dockerfile.api
├── Dockerfile.web
├── package.json
├── sonar-project.properties
├── townies (your project script)
├── tsconfig.json
└── tslint.json
```

## Getting Started with Docker and development

1.  [Install Docker](https://www.docker.com/products/overview)
2.  Run `brew install direnv`
3.  Add `eval "$(direnv hook zsh)"` to `~/.zshrc` or setup your shell of choice
4.  Run  `direnv allow`
5.  Run `./townies dev start`
6.  Run `open localhost:8080`


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


## Docker Compose Explanations

```
├── deployment/
│   ├── development/
│       ├── docker-compose.yml
│       ├── docker-compose.dev.yml
│       ├── docker-compose.test.yml

```
The project script invokes docker-compose to bring up the environment for development and for running tests.

The base compose file contains definitions of the services, volumes, and databases(we create both a dev and test db).

The dev compose file contains environment variable overrides, ports to be exposed, and overly long commands to start the services.

The test compose file contains overrides to run all the tests against a test database in the api service. It also
contains a sonar-scanner service to run on CI for tests and code quality metrics to report to a sonar server.

The end result is you have a fully running setup with 4 containers(db, api, web, api test). These 4 containers enable you the following behaviors:
* Tests running via file watching with jest for fast feedback cycles
* Compile and hot reload of api(backend) code
* Compile and live reload of the web(frontend) code
* Exposed debugger for the api


## Docker File Explanations

 ```
 Dockerfile.api
 Dockerfile.web
 ```
These must be root level for docker context reasons and yarn workspaces.

We use multi-stage builds that allow us to run with a single dockerfile for both production and development.

Docker compose supports targeting a stage in the dockerfile for use in development.

We do what we can to optimize the speed and size of the images.

There is more to do here but in the current code base we run 7MB for the web container and 53MB for the api container.


## TODO

- [ ] Remove redundant yarn runs during docker file building
- [ ] Finish module readmes
- [ ] Provide a basic feature walkthrough to explain and show off the code structure and tooling