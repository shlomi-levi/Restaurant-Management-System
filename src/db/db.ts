import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function testConnection() {
    console.log("Testing connection...");
    try {
        await db.execute(`SELECT 1`);
        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
}

export { db, testConnection };
// TODO: make sure that if we are in test mode that the databse is "test_database"
