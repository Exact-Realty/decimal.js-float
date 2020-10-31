FROM node:lts-alpine AS builder

RUN addgroup build \
 && adduser -D -G build build

COPY . /tmp/build

RUN chmod -R u=rwX,g=rX,o= /tmp/build && chown -R build:build /tmp/build

USER build

WORKDIR /tmp/build

RUN export GITHUB_TOKEN= \
 && npm install \
 && npm run postinstall \
 && export NODE_ENV=production \
 && npm run prepare \
 && npm run prepublishOnly \
 && npm pack

USER root

RUN mv $(node -p 'const pkg = require("./package.json"); `${pkg.name}-${pkg.version}.tgz`;' | tr '/'  '-' | tr -d '@') /package.tar.gz

FROM node:lts-alpine AS publisher

RUN addgroup publisher \
 && adduser -D -G publisher publisher
 
WORKDIR /home/publisher

USER publisher

COPY --from=builder /package.tar.gz /package.tar.gz

COPY .npmrc .npmrc

ARG GITHUB_TOKEN=

RUN if [ x"$GITHUB_TOKEN" != x'' ]; then \
      npm publish /package.tar.gz; \
    fi
