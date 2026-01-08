import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/config/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: "aws-1-ap-south-1.pooler.supabase.com",
    port: 5432,
    user: "postgres.hkssywilbmtqotzsesiv",
    password: "Sujith@123#", // ← RAW password here (NOT encoded)
    database: "postgres",
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
