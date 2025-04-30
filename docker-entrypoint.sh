if [ ! -f .env ]; then
  echo "Creating file .env..."
  echo "DATABASE_URL=postgresql://postgres:root@postgres_db:5432/prueba_tecnica_gux?schema=public" > .env
  echo ".env created successfully"
fi

echo "⏳ Waiting for db..."
until bunx prisma db push; do
  >&2 echo "❌ Prisma connection to DB failed. Retrying in  2s..."
  sleep 2
done

echo "✅ Prisma DB ready. Executing migrations..."
bunx prisma migrate deploy

echo "🚀 Stating app..."
exec bun run start