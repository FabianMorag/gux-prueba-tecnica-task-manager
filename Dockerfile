FROM oven/bun:1-slim

RUN apt-get update -y \
&& apt-get install -y openssl

WORKDIR /app
COPY . .

RUN chmod +x /app/docker-entrypoint.sh

ENTRYPOINT ["/bin/sh", "/app/docker-entrypoint.sh"]