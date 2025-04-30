FROM oven/bun:1-slim

RUN apt-get update -y \
&& apt-get install -y openssl

WORKDIR /app
COPY . .

RUN bun install
RUN bun run auth
RUN chmod +x docker-entrypoint.sh
RUN bun run prisma-generate
# RUN bun run prisma-migrate
RUN bun run build

ENTRYPOINT [ "docker-entrypoint.sh" ]

# CMD ["bun", "run", "start"]
