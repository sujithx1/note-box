import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/config/schema.ts', // Path to your schema
  out: './drizzle', // Path where migrations will be stored
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
