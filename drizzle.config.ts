import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/db/drizzle/schema.ts",
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    out: "./src/db/drizzle/",
    verbose: true,
    strict: true,
});
