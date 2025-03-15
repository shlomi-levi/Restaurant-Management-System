import { Request, Response } from "express";
import { restaurantExists, dishExists } from "./db_validations";
import { StatusCodes } from "http-status-codes";
import { addOrderBodyDTO } from "../../../typing/requests/orders";
import { ORDERS_REQUESTS } from "../../../typing/api";
import { requestTypeToDTO } from "../../../typing/requests/orders";
import { baseValidateSyntax, getObjectNumericKeys } from "./validator";

export const validateRestaurantExistence = async (
    req: Request,
    res: Response,
    next: Function
) => {
    const exists: boolean = await restaurantExists(req.body.restaurantId);
    if (!exists) {
        res.status(StatusCodes.BAD_REQUEST).send("There is no restaurant with this id");
        return;
    }
    next();
};

export const validateDishesExistence = async (
    req: Request<any, any, addOrderBodyDTO>,
    res: Response,
    next: Function
) => {
    const restaurant_id = req.body.restaurantId;

    for (const item of req.body.orderItems) {
        const dish_id = item.dishId;
        const exists: boolean = await dishExists(restaurant_id, dish_id);

        if (!exists) {
            res.status(StatusCodes.BAD_REQUEST).send(
                "There is no dish with id " +
                    dish_id +
                    " that belongs to a restaurant with id " +
                    restaurant_id
            );
            return;
        }
    }
    next();
};

type validateSyntaxReturnType = ReturnType<typeof baseValidateSyntax>;

export const validateSyntax = Object.fromEntries(
    getObjectNumericKeys(ORDERS_REQUESTS).map((req) => [
        req,
        baseValidateSyntax(requestTypeToDTO[req as unknown as ORDERS_REQUESTS]),
    ])
) as Record<ORDERS_REQUESTS, validateSyntaxReturnType>;
