import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

export const pool = new Pool({
  // connectionString: process.env.DATABASE_URL!,
  host: "aws-1-ap-south-1.pooler.supabase.com",
  port: 5432,
  user: "postgres.hkssywilbmtqotzsesiv",
  password: "Sujith@123#", // ← RAW password here (NOT encoded)
  database: "postgres",
  ssl: {
    rejectUnauthorized: false,
  },
});

export const db = drizzle(pool, { schema });
export { schema };
