import { restaurantExists, dishExists } from "./db_validations";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { DISHES_REQUESTS, RESTAURANTS_REQUESTS } from "../../../typing/api";
import { baseValidateSyntax } from "./validator";
import {
    requestTypeToDTO as reqToDTORestaurants,
    verifyRestaurantExistenceDTO,
} from "../../../typing/requests/restaurants";

import {
    requestTypeToDTO as reqToDTODishes,
    verifyDishExistsDTO,
} from "../../../typing/requests/dishes";

export const dishExistenceValidator = async (
    req: Request,
    res: Response,
    next: Function
) => {
    const route_parameters = req.params as unknown as verifyDishExistsDTO;
    const exists: boolean = await dishExists(
        route_parameters.id,
        route_parameters.dishId
    );

    if (!exists) {
        res.status(StatusCodes.NOT_FOUND).send(
            "There is no dish with this dishid that belongs to a restaurant with that id"
        );
        return;
    }

    next();
};

export const restaurantExistenceValidator = async (
    req: Request,
    res: Response,
    next: Function
) => {
    const route_parameters = req.params as unknown as verifyRestaurantExistenceDTO;
    const exists: boolean = await restaurantExists(route_parameters.id);

    if (!exists) {
        res.status(StatusCodes.NOT_FOUND).send("There is no restaurant with this id");
        return;
    }

    next();
};

type validateSyntaxReturnType = ReturnType<typeof baseValidateSyntax>;

const validateSyntaxRestaurants = Object.fromEntries(
    Object.keys(RESTAURANTS_REQUESTS).map((req) => [
        req,
        baseValidateSyntax(reqToDTORestaurants[req as unknown as RESTAURANTS_REQUESTS]),
    ])
) as Record<RESTAURANTS_REQUESTS, validateSyntaxReturnType>;

const validateSyntaxDishes = Object.fromEntries(
    Object.keys(DISHES_REQUESTS).map((req) => [
        req,
        baseValidateSyntax(reqToDTODishes[req as unknown as DISHES_REQUESTS]),
    ])
) as Record<DISHES_REQUESTS, validateSyntaxReturnType>;

export const validateSyntax = { ...validateSyntaxRestaurants, ...validateSyntaxDishes };
