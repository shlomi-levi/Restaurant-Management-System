import { restaurantExists } from "./db_validations";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { RATINGS_REQUESTS } from "../../../typing/api";
import { baseValidateSyntax } from "./validator";
import { requestTypeToDTO } from "../../../typing/requests/ratings";

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

type validateSyntaxReturnType = ReturnType<typeof baseValidateSyntax>;

export const validateSyntax = Object.fromEntries(
    Object.keys(RATINGS_REQUESTS).map((req) => [
        req,
        baseValidateSyntax(requestTypeToDTO[req as unknown as RATINGS_REQUESTS]),
    ])
) as Record<RATINGS_REQUESTS, validateSyntaxReturnType>;
