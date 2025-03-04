import { validateInput } from "./validator";
import { checkRestaurantExistence, checkDishExistence } from "../db_validations";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const emptyBodyValidator = async (
    req: Request,
    res: Response,
    next: Function
) => {
    if (Object.keys(req.body).length) {
        res.status(StatusCodes.BAD_REQUEST).send("Request body must be empty");
        return;
    }

    next();
};

export const postRestaurantValidator = async (
    req: Request,
    res: Response,
    next: Function
) => {
    await validateInput(req, res, next, new RestraurantRequestDTO(), false, false);
};

export const dishExistenceValidator = async (
    req: Request,
    res: Response,
    next: Function
) => {
    const exists: boolean = await checkDishExistence(
        req.params["id"],
        req.params["dishid"]
    );

    if (!exists) {
        res.status(StatusCodes.NOT_FOUND).send(
            "There is no dish with this dishid that belongs to a restaurant with that id"
        );
        return;
    }

    next();
};

export const postDishValidator = async (req: Request, res: Response, next: Function) => {
    await validateInput(req, res, next, new DishRequestDTO(), false, false);
};

export const putDishValidator = async (req: Request, res: Response, next: Function) => {
    await validateInput(req, res, next, new DishRequestDTO(), true, false);
};

export const putRestaurantValidator = async (
    req: Request,
    res: Response,
    next: Function
) => {
    if (req.body.hasOwnProperty("cuisines")) {
        for (const val of req.body.cuisines) {
            if (val.includes("'")) {
                res.status(StatusCodes.BAD_REQUEST).send(
                    "Cuisines cannot contain ' symbol"
                );
                return;
            }
        }
    }
    await validateInput(req, res, next, new RestraurantRequestDTO(), true, false);
};

export const restaurantExistenceValidator = async (
    req: Request,
    res: Response,
    next: Function
) => {
    const exists: boolean = await checkRestaurantExistence(req.params["id"]);

    if (!exists) {
        res.status(StatusCodes.NOT_FOUND).send("There is no restaurant with this id");
        return;
    }

    next();
};
