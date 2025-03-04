import * as dto from "../requests/dishes";
import Handler from "./utils";

interface dishesInterface {
    addDish: Handler<dto.addDishRouteDTO, dto.addDishBodyDTO, {}>;

    updateDish: Handler<dto.updateDishRouteDTO, dto.updateDishBodyDTO>;

    deleteDish: Handler<dto.deleteDishRouteDTO>;

    getDishesByRestaurant: Handler<dto.getDishesByRestaurantRouteDTO>;
}

export default dishesInterface;
