import { Router } from "express";
import {
    validateSyntax,
    validateRestaurantExistence,
} from "../middleware/validation/ratings";
import RatingsHandler from "../../handlers/ratings";
import { RATINGS_REQUESTS } from "../../typing/api";

export const ratingsRouter = Router();

ratingsRouter.post(
    "/",
    validateSyntax[RATINGS_REQUESTS.ADD_RATING],
    validateRestaurantExistence,
    RatingsHandler.handleNewRating
);
