import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

const queryClient = postgres(process.env.DATABASE_URL as string);
const db = drizzle({ client: queryClient });

const initDB = async () => {
    try {
        await migrate(db, { migrationsFolder: "../drizzle/migrations" }); // Pass config object
        console.log("Migrations applied successfully");
    } catch (error) {
        console.error("Migration failed:", error);
    }
};

async function testConnection() {
    try {
        await db.execute(`SELECT 1`);
        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
}

initDB();
testConnection();
// TODO: make sure that if we are in test mode that the databse is "test_database"

export { initDB, testConnection, queryClient, db };
