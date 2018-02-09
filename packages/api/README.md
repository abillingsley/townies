# API

## Code Organization

* src/
  * plugins/
  * router | controllers/
  * services/, Contains API specific implementation of service interfaces.
    * {domain concept}/
  * index.ts, entry point for starting the api server
  * container.ts, IoC container
  * inversify.ts, IoC configuration
  * inversify.test.ts, IoC configuration for test
  * server.ts, Hapi Server configuration
