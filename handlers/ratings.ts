import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ratingsInterface from "./interfaces/ratings";
import client from "../db/db";

const Handler: ratingsInterface = {
    async handleNewRating(req: Request, res: Response, next: Function): Promise<void> {
        const restaurant_id = req.body.restaurantId;
        const rating = req.body.rating;

        try {
            await client.query("INSERT INTO RATINGS VALUES ($1, $2)", [
                restaurant_id,
                rating,
            ]);

            await client.query(
                "UPDATE RESTAURANTS SET AVERAGERATING=(SELECT AVG(RATING) FROM RATINGS WHERE RESTAURANT_ID=$1 GROUP BY(RESTAURANT_ID)) WHERE ID=$1",
                [restaurant_id]
            );
        } catch (e) {
            console.log(e);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error");
            return;
        }
        res.status(StatusCodes.OK).send();
        next();
    },
};

export default Handler;
