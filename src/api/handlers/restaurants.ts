import restaurantsInterface from "../typing/handlers/restaurants";
import { StatusCodes } from "http-status-codes";
import { db } from "../../db/db";
import { arrayOverlaps, eq } from "drizzle-orm";
import * as schema from "../../db/drizzle/schema";

const Handler: restaurantsInterface = {
    getAllRestaurants: async (req, res, next) => {
        const result = await db.select().from(schema.restaurants);
        res.status(StatusCodes.OK).send(result);

        next();
    },

    getRestaurantsByCuisine: async (req, res, next) => {
        const result = await db
            .select()
            .from(schema.restaurants)
            .where(
                arrayOverlaps(schema.restaurants.cuisines, [req.query.cuisine as string])
            );
        res.status(StatusCodes.OK).send(result);
        next();
    },

    getRestaurantById: async (req, res, next) => {
        const result = await db
            .select()
            .from(schema.restaurants)
            .where(eq(schema.restaurants.id, req.params.id));

        res.status(StatusCodes.OK).send(result);

        next();
    },

    addNewRestaurant: async (req, res, next) => {
        try {
            const { name, isKosher, cuisines } = req.body;

            const result = await db
                .insert(schema.restaurants)
                .values({ name, isKosher, cuisines })
                .returning();

            if (!result) throw new Error();
        } catch (e) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal server error");
            return Promise.resolve();
        }

        res.status(StatusCodes.CREATED).send("");

        next();
    },

    updateRestaurant: async (req, res, next) => {
        try {
            const result = await db
                .update(schema.restaurants)
                .set(req.body)
                .where(eq(schema.restaurants.id, req.params.id));

            if (!result) throw new Error();
        } catch (e) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error");
            return Promise.resolve();
        }

        res.status(StatusCodes.OK).send("");

        next();
    },

    deleteRestaurant: async (req, res, next) => {
        const result = await db
            .delete(schema.restaurants)
            .where(eq(schema.restaurants.id, req.params.id));

        if (!result) {
            res.status(StatusCodes.NOT_FOUND).send(
                "There is no restaurant with this id"
            );
            return Promise.resolve();
        }

        res.status(StatusCodes.NO_CONTENT).send("");

        next();
    },
};

export default Handler;
