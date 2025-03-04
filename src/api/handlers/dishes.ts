import dishesInterface from "../typing/handlers/dishes";
import { db } from "../../db/db";
import * as schema from "../../db/drizzle/schema";
import { StatusCodes } from "http-status-codes";
import { and, eq } from "drizzle-orm";

const Handler: dishesInterface = {
    addDish: async (req, res, next) => {
        const restaurant_id = req.params.id; // TODO: validate that it is an integer, before even getting to this phase (or check wether req.params is always a string)

        try {
            const { name, description, price } = req.body;

            const res = await db
                .insert(schema.dishes)
                .values({ name, restaurant_id, description, price })
                .returning();

            if (!res) throw new Error();
        } catch (e) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error");

            return Promise.resolve();
        }

        res.status(StatusCodes.CREATED).send("");

        next();
    },

    updateDish: async (req, res, next) => {
        const restaurant_id = req.params.id;
        const dish_id = req.params.dishId;
        try {
            const res = await db
                .update(schema.dishes)
                .set(req.body)
                .where(
                    and(
                        eq(schema.dishes.restaurant_id, restaurant_id),
                        eq(schema.dishes.id, dish_id)
                    )
                )
                .returning();

            if (!res) throw new Error();
        } catch (e) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error");
            return Promise.resolve();
        }

        res.status(StatusCodes.OK).send("");

        next();
    },

    deleteDish: async (req, res, next) => {
        const restaurant_id = req.params.id;
        const dish_id = req.params.dishId;

        try {
            const res = await db
                .delete(schema.dishes)
                .where(
                    and(
                        eq(schema.dishes.restaurant_id, restaurant_id),
                        eq(schema.dishes.id, dish_id)
                    )
                );

            if (!res) throw new Error();
        } catch (e) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error");
            return Promise.resolve();
        }

        res.status(StatusCodes.NO_CONTENT).send("");

        next();
    },

    getDishesByRestaurant: async (req, res, next) => {
        try {
            const restaurant_id = req.params.id;
            const res = await db
                .select({
                    id: schema.dishes.id,
                    name: schema.dishes.name,
                    description: schema.dishes.description,
                    price: schema.dishes.price,
                })
                .from(schema.dishes)
                .where(eq(schema.dishes.restaurant_id, restaurant_id));
        } catch (e) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error");
            return Promise.resolve();
        }

        res.status(StatusCodes.OK).send(res);

        next();
    },
};
