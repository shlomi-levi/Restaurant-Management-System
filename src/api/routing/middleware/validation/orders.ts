import { IsArray, IsInt } from "class-validator";
import { validateInput } from "./validator";
import { Request, Response } from "express";
import { checkRestaurantExistence, checkDishExistence } from "../db_validations";
import { StatusCodes } from "http-status-codes";

export const validateNewOrderSyntax = async (
    req: Request,
    res: Response,
    next: Function
) => {
    let dto_object = new orderRequestDTO();
    Object.assign(dto_object, req.body);

    let input_validated: boolean = await validateInput(
        req,
        res,
        next,
        dto_object,
        false,
        false,
        false
    );

    if (!input_validated) return;

    // Using ValidateNested didn't work for some reason, so I am validating one by one.

    for (const item of dto_object.orderItems) {
        let dto_object_orderItem = new orderItemsDTO();

        input_validated = await validateInput(
            req,
            res,
            next,
            dto_object_orderItem,
            false,
            false,
            false,
            item
        );

        if (!input_validated) return;
    }

    next();
};

export const validateRestaurantExistence = async (
    req: Request,
    res: Response,
    next: Function
) => {
    const exists: boolean = await checkRestaurantExistence(req.body.restaurantId);
    if (!exists) {
        res.status(StatusCodes.BAD_REQUEST).send("There is no restaurant with this id");
        return;
    }
    next();
};

export const validateDishesExistence = async (
    req: Request,
    res: Response,
    next: Function
) => {
    const restaurant_id = req.body.restaurantId;

    for (const item of req.body.orderItems) {
        const dish_id = item.dishId;
        const exists: boolean = await checkDishExistence(restaurant_id, dish_id);

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
