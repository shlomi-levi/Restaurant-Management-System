import dotenv from "dotenv";
import express from "express";
import { restaurantsRouter } from "./api/routing/routes/restaurants";
import { ratingsRouter } from "./api/routing/routes/ratings";
import { ordersRouter } from "./api/routing/routes/orders";
import { initDB, testConnection, queryClient } from "./db/db";

//For env File
dotenv.config();

initDB();
testConnection();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use("/restaurants", restaurantsRouter);
app.use("/ratings", ratingsRouter);
app.use("/order", ordersRouter);

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
