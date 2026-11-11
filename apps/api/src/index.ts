import { drizzle } from "drizzle-orm/neon-http";

if (process.env.DATABASE_URL) {
  const db = drizzle(process.env.DATABASE_URL);
  console.log(db);
}
