import dotenv from "dotenv";
import express, { Application } from "express";
import restaurantsRoute from "./routing/restaurants";
import ratingsRoute from "./routing/ratings";
import ordersRoute from "./routing/orders";
import { initDB, testConnection, queryClient } from "./db/db";

//For env File
dotenv.config();

initDB();
testConnection();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use("/restaurants", restaurantsRoute);
app.use("/ratings", ratingsRoute);
app.use("/order", ordersRoute);

export const server = app.listen(port, () => {
    console.log(`Server is On at http://localhost:${port}`);
});

process.on("SIGINT", async () => {
    try {
        await queryClient.end();
        process.exit(0);
    } catch (error) {
        console.error("error during disconnection", error);
        process.exit(1);
    }
});

process.on("SIGTERM", async () => {
    try {
        await queryClient.end();
        process.exit(0);
    } catch (error) {
        console.error("error during disconnection", error);
        process.exit(1);
    }
});

export default app;
