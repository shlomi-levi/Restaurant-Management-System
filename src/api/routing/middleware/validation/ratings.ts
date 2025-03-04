import { checkRestaurantExistence } from "../db_validations";
import { validateInput } from "./validator";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const validatePostRating = async (
    req: Request,
    res: Response,
    next: Function
) => {
    let ratings_dto_object = new ratingsDTO();
    Object.assign(ratings_dto_object, req.body);

    await validateInput(req, res, next, ratings_dto_object, false, false);
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
