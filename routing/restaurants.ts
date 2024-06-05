import { Router } from "express";
import RestaurantsHandler from "../handlers/restaurants";

import {
    postRestaurantValidator,
    putRestaurantValidator,
    postDishValidator,
    restaurantExistenceValidator,
    dishExistenceValidator,
    putDishValidator,
    emptyBodyValidator,
} from "../handlers/middleware/restaurants";

const router = Router();

/* Restaurant API */

router.get("/", emptyBodyValidator, RestaurantsHandler.getRestaurants);

router.get(
    "/:id",
    emptyBodyValidator,
    restaurantExistenceValidator,
    RestaurantsHandler.getRestaurantById
);

router.post("/", postRestaurantValidator, RestaurantsHandler.addNewRestaurant);

router.put(
    "/:id",
    putRestaurantValidator,
    restaurantExistenceValidator,
    RestaurantsHandler.updateRestaurant
);

router.delete(
    "/:id",
    emptyBodyValidator,
    restaurantExistenceValidator,
    RestaurantsHandler.deleteRestaurant
);

/* Dishes API */
router.post(
    "/:id/dishes",
    postDishValidator,
    restaurantExistenceValidator,
    RestaurantsHandler.addDish
);

router.put(
    "/:id/dishes/:dishid",
    putDishValidator,
    restaurantExistenceValidator,
    dishExistenceValidator,
    RestaurantsHandler.updateDish
);

router.delete(
    "/:id/dishes/:dishid",
    emptyBodyValidator,
    restaurantExistenceValidator,
    dishExistenceValidator,
    RestaurantsHandler.deleteDish
);

router.get(
    "/:id/dishes",
    emptyBodyValidator,
    restaurantExistenceValidator,
    RestaurantsHandler.getDishesByRestaurant
);

module.exports = router;
