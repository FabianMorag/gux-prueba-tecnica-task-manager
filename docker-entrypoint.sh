if [ ! -f .env ]; then
  echo "Creating file .env..."
  echo "DATABASE_URL=postgresql://postgres:root@postgres_db:5432/prueba_tecnica_gux?schema=public
        AUTH_TRUST_HOST=true" > .env
  echo ".env file created successfully"
fi

bun install
bun run auth
bun run prisma-generate

echo "⏳ Waiting for db..."
until bunx prisma db push; do
  >&2 echo "❌ Prisma connection to DB failed. Retrying in  2s..."
  sleep 2
done
echo "✅ Prisma DB ready. Executing migrations..."
bunx run prisma-migrate

bun run build
bun run start