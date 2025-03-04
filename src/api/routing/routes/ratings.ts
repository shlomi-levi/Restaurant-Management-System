import { Router } from "express";
import { validatePostRating } from "../handlers/middleware/ratings";
import RatingsHandler from "../handlers/ratings";
import { validateRestaurantExistence } from "../handlers/middleware/ratings";

const router = Router();

router.post(
    "/",
    validatePostRating,
    validateRestaurantExistence,
    RatingsHandler.handleNewRating
);

export default router;
