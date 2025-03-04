import * as dto from "../requests/restaurants";
import Handler from "./utils";

interface restaurantsInterface {
    getAllRestaurants: Handler;

    getRestaurantsByCuisine: Handler<{}, {}, dto.getRestaurantsByCuisineQueryDTO>;

    getRestaurantById: Handler<dto.getRestaurantsByIdRouteDTO, {}, {}>;

    addNewRestaurant: Handler<{}, dto.addNewRestaurantBodyDTO, {}>;

    updateRestaurant: Handler<
        dto.updateRestaurantRouteDTO,
        {},
        dto.updateRestaurantBodyDTO
    >;

    deleteRestaurant: Handler<dto.deleteRestaurantRouteDTO, {}, {}>;
}

export default restaurantsInterface;
