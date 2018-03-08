# ---- Base Node ----
FROM mhart/alpine-node:9.4.0 AS base
WORKDIR /app
RUN apk add --no-cache make gcc bash g++ python
COPY package.json yarn.lock /app/
COPY api/package.json /app/api/package.json
COPY core/package.json /app/core/package.json
COPY config/package.json /app/config/package.json
COPY infrastructure/package.json /app/infrastructure/package.json
RUN yarn

# ---- Development ----
# Don't copy anything -- compose will do that.
FROM base as development
WORKDIR /app

# ---- Release ----
FROM mhart/alpine-node:9.4.0 AS release
WORKDIR /app
COPY . .
COPY --from=base /app /app
RUN yarn
RUN /app/node_modules/.bin/tsc
EXPOSE 3000
CMD ["node", "dist/api/src/index.js"]
