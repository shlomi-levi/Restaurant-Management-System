import dotenv from "dotenv";
import express, { Application } from "express";
import client from "./db/db";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

let restaurantsRoutes = require("./routing/restaurants");
let ratingsRoutes = require("./routing/ratings");
let ordersRoutes = require("./routing/orders");

app.use(express.json());
app.use("/restaurants", restaurantsRoutes);
app.use("/ratings", ratingsRoutes);
app.use("/order", ordersRoutes);

export const server = app.listen(port, () => {
    console.log(`Server is On at http://localhost:${port}`);
});

process.on("SIGINT", () => {
    client.end((err: Error) => {
        if (err) {
            console.error("error during disconnection", err.stack);
        }
        process.exit();
    });
});

process.on("SIGTERM", () => {
    client.end((err: Error) => {
        if (err) {
            console.error("error during disconnection", err.stack);
        }
        process.exit();
    });
});

export default app;
