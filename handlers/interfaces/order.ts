import { Request, Response } from "express";

interface ordersInterface {
    handleNewOrder: (req: Request, res: Response, next: Function) => void;
}

export default ordersInterface;
