import { Router } from "express";
import { validateDishesExistence } from "../middleware/validation/orders";
import { validateSyntax } from "../middleware/validation/orders";
import ordersHandler from "../../handlers/orders";
import { ORDERS_REQUESTS } from "../../typing/api";

export const ordersRouter = Router();

ordersRouter.post(
    "/",
    validateSyntax[ORDERS_REQUESTS.ADD_ORDER],
    validateDishesExistence,
    ordersHandler.addNewOrder
);
