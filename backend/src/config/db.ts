import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

export const pool = new Pool({
  connectionString:
    "postgresql://postgres.hkssywilbmtqotzsesiv:Sujith%40123%23@aws-0-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=no-verify",
  ssl: {
    rejectUnauthorized: false,
  },
});

export const db = drizzle(pool, { schema });
export { schema };
