import { Router } from "express";
import {
    restaurantExistenceValidator,
    dishExistenceValidator,
} from "../middleware/validation/restaurants";
import RestaurantsHandler from "../../handlers/restaurants";
import dishesHandler from "../../handlers/dishes";
import { validateSyntax } from "../middleware/validation/restaurants";
import { RESTAURANTS_REQUESTS, DISHES_REQUESTS } from "../../typing/api";

export const restaurantsRouter = Router();

/* Restaurant API */

restaurantsRouter.get(
    "/",
    validateSyntax[RESTAURANTS_REQUESTS.GET_ALL_RESTAURANTS],
    RestaurantsHandler.getAllRestaurants
);

restaurantsRouter.get(
    "/:id",
    validateSyntax[RESTAURANTS_REQUESTS.GET_RESTAURANT_BY_ID],
    restaurantExistenceValidator,
    RestaurantsHandler.getRestaurantById
);

restaurantsRouter.post(
    "/",
    validateSyntax[RESTAURANTS_REQUESTS.ADD_RESTAURANT],
    RestaurantsHandler.addNewRestaurant
);

restaurantsRouter.put(
    "/:id",
    validateSyntax[RESTAURANTS_REQUESTS.UPDATE_RESTAURANT],
    restaurantExistenceValidator,
    RestaurantsHandler.updateRestaurant
);

restaurantsRouter.delete(
    "/:id",
    validateSyntax[RESTAURANTS_REQUESTS.DELETE_RESTAURANT],
    restaurantExistenceValidator,
    RestaurantsHandler.deleteRestaurant
);

/* Dishes API */
restaurantsRouter.post(
    "/:id/dishes",
    validateSyntax[DISHES_REQUESTS.ADD_DISH],
    restaurantExistenceValidator,
    dishesHandler.addDish
);

restaurantsRouter.put(
    "/:id/dishes/:dishId",
    validateSyntax[DISHES_REQUESTS.UPDATE_DISH],
    restaurantExistenceValidator,
    dishExistenceValidator,
    dishesHandler.updateDish
);

restaurantsRouter.delete(
    "/:id/dishes/:dishId",
    validateSyntax[DISHES_REQUESTS.DELETE_DISH],
    restaurantExistenceValidator,
    dishExistenceValidator,
    dishesHandler.deleteDish
);

restaurantsRouter.get(
    "/:id/dishes",
    validateSyntax[DISHES_REQUESTS.GET_DISHES_BY_RESTAURANT],
    restaurantExistenceValidator,
    dishesHandler.getDishesByRestaurant
);
