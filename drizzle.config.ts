import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL as string,
    },
    schema: "./src/db/drizzle/schema.ts",
    out: "./src/db/drizzle/migrations",
    verbose: true,
    strict: true,
});
