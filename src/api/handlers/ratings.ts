import { StatusCodes } from "http-status-codes";
import ratingsInterface from "../typing/handlers/ratings";
import { db } from "../../db/db";
import * as schema from "../../db/drizzle/schema";
import { avg, eq } from "drizzle-orm";

const Handler: ratingsInterface = {
    handleNewRating: async (req, res, next) => {
        const restaurant_id = req.body.restaurantId;
        const rating = req.body.rating;

        try {
            await db.insert(schema.ratings).values({ rating, restaurant_id }); // Insert new rating

            // Calculate new avg rating
            const new_rating = await db
                .select({ value: avg(schema.ratings.rating) })
                .from(schema.ratings)
                .where(eq(schema.ratings.restaurant_id, restaurant_id))
                .groupBy(schema.ratings.restaurant_id); // TODO: Check what this returns

            // Update new avg rating
            await db
                .update(schema.restaurants)
                .set({ avg_rating: +new_rating })
                .where(eq(schema.restaurants.id, restaurant_id));
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
