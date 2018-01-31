#!/usr/bin/env bash
set -e

docker run --rm -v ${PWD}:/local --network dttownies_backoffice --link dttownies_api_1:api grimesjm/swagger-cli:latest generate \
  -i http://api:3000/swagger \
  -l typescript-fetch \
  -o /local/tmp/townies_api
node_modules/.bin/tsc -p tsconfig.swagger.json
rm -rf tmp/townies_api/
