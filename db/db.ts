import { Client } from "pg";

const client = new Client({
    host: "localhost",
    port: 5438,
    user: "postgres",
    password: "example",
    database: process.env.NODE_ENV === "test" ? "test_database" : "postgres",
    // database: "postgres",
});

client.connect((err: Error) => {
    if (err) {
        console.error("DB connection error", err.stack);
    } else {
        console.log("connected to DB");
    }
});

export default client;
