import type { Config } from "drizzle-kit";
export default {
  schema: "./db/db-schemas.ts",
  out: "./drizzle",
  dialect: "sqlite",
  driver: "expo", // <--- very important
} satisfies Config;
