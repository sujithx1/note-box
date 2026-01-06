import { Pool } from 'pg';

import { drizzle } from 'drizzle-orm/node-postgres'
import { env } from 'bun';
import * as schema from './schema';
// 1️⃣ Create Postgres connection pool
const pool = new Pool({
  connectionString: env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false }, // required for Supabase/Neon
})

export const db = drizzle(pool, {
  schema,
  logger: false,
})
// Optional: export schema for queries
export { schema };