import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { orderIdExists } from "./db_validations";
import { StatusCodes } from "http-status-codes";

import ordersInterface from "./interfaces/order";
import client from "../db/db";

const Handler: ordersInterface = {
    async handleNewOrder(req: Request, res: Response, next: Function): Promise<void> {
        let order_id: string = "";
        try {
            let order_id_exists: boolean = true;

            while (order_id_exists) {
                order_id = uuidv4();
                order_id_exists = await orderIdExists(order_id);
            }

            await client.query("INSERT INTO ORDERS VALUES ($1, NOW())", [order_id]);

            for (const item of req.body.orderItems) {
                await client.query("INSERT INTO ORDERITEM VALUES ($1, $2, $3)", [
                    order_id,
                    item.dishId,
                    item.amount,
                ]);
            }
        } catch (e) {
            console.log(e);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("INTERNAL SERVER ERROR");
            return Promise.resolve();
        }

        res.status(StatusCodes.OK).send({ orderId: order_id });
        next();
    },
};

export default Handler;
