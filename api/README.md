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

## Auth0 Integration

### Configuring Auth0

1. Create Resource Server to Represent the Application API

```
curl -X POST \
  https://{auth0-domain}/api/v2/resource-servers \
  -H 'Authorization: bearer {jwt token with access to managment api}' \
  -d '{
    "name": "{Application Name} API",
    "identifier": "{Application API Base URL}"
  }'
```

Example:

```
curl -X POST \
  https://dt-townies.auth0.com/api/v2/resource-servers \
  -H 'Authorization: bearer' \
  -d '{
    "name": "Townies API (Development)",
    "identifier": "http://localhost:8080/api"
  }'
```

2. Create a Client for each End User Application that will be consuming the Application API (resource server)

```
curl -X POST \
  https://{auth0-domain}/api/v2/clients \
  -H 'Authorization: bearer {jwt token with access to managment api}' \
  -d ' {
    "name": "{Application Name}",
    "jwt_configuration": {
      "alg": "RS256"
    },
    "callbacks": [
      "{url to page to call after successful login}"
    ],
    "web_origins": [
      "{list of origins for CORs}"
    ]
  }'
```

Example:

```
curl -X POST \
  https://dt-townies.auth0.com/api/v2/clients \
  -H 'Authorization: bearer ' \
  -d ' {
    "name": "Townies",
    "jwt_configuration": {
      "alg": "RS256"
    },
    "callbacks": [
      "http://localhost:8080/callback"
    ],
    "web_origins": [
      "http://localhost:8080"
    ]
  }'
```

3. Grant Client Created in Step 2 access to the Resource Server created in Step 1
> We need to give the client access to the api
```
curl -X POST \
  https://{auth0-domain}/api/v2/client-grants \
  -H 'Authorization: bearer {jwt token with access to managment api}' \
  -d '{
    "client_id": "{client_id returned in step 2}",
    "audience": "{identifier provided in step 1}",
    "scope": []
  }'
```

Example:

```
curl -X POST \
  https://dt-townies.auth0.com/api/v2/client-grants \
  -H 'Authorization: bearer ' \
  -d '{
    "client_id": "2FPnIEGtRn22KC3q6nrEo9k6bxIRYL3D",
    "audience": "http://localhost:8080/api",
    "scope": []
  }'
```

### Adding Auth0 RS256 Auth Strategy to Hapi

https://auth0.com/docs/quickstart/backend/hapi/01-authorization

References

* src/plugins/jwtAuthentication.ts (Registers JWT Auth Strategy with Hapi)
* src/router/api/v1/applicationAuthorizedRoute.ts (Defines the base route handler for all routes that will leverage the JWT Authentication Strategy)
* src/server.ts (configures jwt auth strategy)
* https://github.com/dwyl/hapi-auth-jwt2
* https://github.com/auth0/node-jwks-rsa
* https://github.com/auth0/node-jsonwebtoken
