import { StatusCodes } from "http-status-codes";
import ordersInterface from "../typing/handlers/order";
import { db } from "../../db/db";
import * as schema from "../../db/drizzle/schema";

const Handler: ordersInterface = {
    addNewOrder: async (req, res, next) => {
        try {
            const [order] = await db.insert(schema.orders).values({}).returning();
            const order_id = order?.id;

            for (const item of req.body.orderItems) {
                await db
                    .insert(schema.orderItems)
                    .values({ order_id, dish_id: item.dishId, amount: item.amount });
            }

            res.status(StatusCodes.OK).send({ orderId: order_id });
        } catch (e) {
            console.log(e);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("INTERNAL SERVER ERROR");
            return Promise.resolve();
        }
        next();
    },
};

export default Handler;
