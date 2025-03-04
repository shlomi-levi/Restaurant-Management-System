import { Router } from "express";
import {
    validateDishesExistence,
    validateNewOrderSyntax,
} from "../handlers/middleware/orders";
import ordersHandler from "../handlers/orders";

const router = Router();

router.post(
    "/",
    validateNewOrderSyntax,
    validateDishesExistence,
    ordersHandler.handleNewOrder
);

export default router;
