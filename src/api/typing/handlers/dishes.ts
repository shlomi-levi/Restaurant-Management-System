import * as dto from "../requests/dishes";
import Handler from "./utils";

interface dishesInterface {
    addDish: Handler<dto.addDishBodyDTO, {}>;

    updateDish: Handler<dto.updateDishBodyDTO>;

    deleteDish: Handler;

    getDishesByRestaurant: Handler;
}

export default dishesInterface;
