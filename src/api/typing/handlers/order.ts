import * as dto from "../requests/orders";
import Handler from "./utils";

interface ordersInterface {
    addNewOrder: Handler<{}, dto.addOrderBodyDTO>;
}

export default ordersInterface;
