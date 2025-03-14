import * as dto from "../requests/restaurants";
import Handler from "./utils";

interface restaurantsInterface {
    getAllRestaurants: Handler;

    getRestaurantsByCuisine: Handler<{}, dto.getRestaurantsByCuisineQueryDTO>;

    getRestaurantById: Handler;

    addNewRestaurant: Handler<dto.addNewRestaurantBodyDTO, {}>;

    updateRestaurant: Handler<dto.updateRestaurantBodyDTO>;

    deleteRestaurant: Handler;
}

export default restaurantsInterface;
