import { Request, Response } from "express";

interface restaurantsInterface {
    getRestaurants: (req: Request, res: Response, next: Function) => Promise<void>;

    getRestaurantById: (req: Request, res: Response, next: Function) => Promise<void>;

    addNewRestaurant: (req: Request, res: Response, next: Function) => Promise<void>;

    updateRestaurant: (req: Request, res: Response, next: Function) => Promise<void>;

    deleteRestaurant: (req: Request, res: Response, next: Function) => Promise<void>;

    addDish: (req: Request, res: Response, next: Function) => Promise<void>;

    updateDish: (req: Request, res: Response, next: Function) => Promise<void>;

    deleteDish: (req: Request, res: Response, next: Function) => Promise<void>;

    getDishesByRestaurant: (
        req: Request,
        res: Response,
        next: Function
    ) => Promise<void>;
}

export default restaurantsInterface;
