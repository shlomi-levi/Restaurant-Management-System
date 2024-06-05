import { Request, Response } from "express";
import restaurantsInterface from "./interfaces/restaurants";
import { StatusCodes } from "http-status-codes";
import client from "../db/db";

const Handler: restaurantsInterface = {
    getRestaurants: async function (
        req: Request,
        res: Response,
        next: Function
    ): Promise<void> {
        let query: string;

        if (req.query.cuisine)
            query = `SELECT * FROM RESTAURANTS WHERE '${req.query.cuisine}'=ANY(cuisines)`;
        else query = "SELECT * FROM RESTAURANTS";

        const query_result = await client.query(query);
        res.status(StatusCodes.OK).send(query_result.rows);

        next();
    },
    getRestaurantById: async function (
        req: Request,
        res: Response,
        next: Function
    ): Promise<void> {
        const restaurant_id = req.params["id"];

        const query_result = await client.query(
            "SELECT * FROM RESTAURANTS WHERE ID=$1",
            [restaurant_id]
        );

        res.status(StatusCodes.OK).send(query_result.rows);

        next();
    },
    addNewRestaurant: async function (
        req: Request,
        res: Response,
        next: Function
    ): Promise<void> {
        try {
            const query_result = await client.query(
                "INSERT INTO RESTAURANTS (NAME, ISKOSHER, CUISINES) VALUES ($1, $2, $3)",
                [req.body.name, req.body.isKosher, req.body.cuisines]
            );

            if (!query_result.rowCount) throw new Error();
        } catch (e) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal server error");
            return Promise.resolve();
        }

        res.status(StatusCodes.CREATED).send("");

        next();
    },
    updateRestaurant: async function (
        req: Request,
        res: Response,
        next: Function
    ): Promise<void> {
        const restaurant_id = req.params["id"];
        let query_string = "UPDATE RESTAURANTS SET ";

        Object.entries(req.body).forEach(([property, value], index) => {
            if (index) query_string += ",";

            if (property.toLowerCase() === "cuisines")
                query_string += `${property}=ARRAY${JSON.stringify(value).replace(
                    /"/g,
                    "'"
                )}`;
            else query_string += `${property}='${value}' `;
        });

        query_string += `WHERE ID=${restaurant_id};`;

        try {
            const query_result = await client.query(query_string);

            if (!query_result.rowCount) throw new Error();
        } catch (e) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error");
            return Promise.resolve();
        }

        res.status(StatusCodes.OK).send("");

        next();
    },
    deleteRestaurant: async function (
        req: Request,
        res: Response,
        next: Function
    ): Promise<void> {
        const restaurant_id = req.params["id"];
        const query_result = await client.query("DELETE FROM RESTAURANTS WHERE ID=$1", [
            restaurant_id,
        ]);

        if (!query_result.rowCount) {
            res.status(StatusCodes.NOT_FOUND).send(
                "There is no restaurant with this id"
            );
            return Promise.resolve();
        }

        res.status(StatusCodes.NO_CONTENT).send("");

        next();
    },
    addDish: async function (
        req: Request,
        res: Response,
        next: Function
    ): Promise<void> {
        const restaurant_id = req.params["id"];

        try {
            const query_result = await client.query(
                "INSERT INTO DISHES (RESTAURANT_ID, NAME, DESCRIPTION, PRICE) VALUES ($1, $2, $3, $4)",
                [restaurant_id, req.body.name, req.body.description, req.body.price]
            );

            if (!query_result.rowCount) throw new Error();
        } catch (e) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error");

            return Promise.resolve();
        }

        res.status(StatusCodes.CREATED).send("");

        next();
    },
    updateDish: async function (
        req: Request,
        res: Response,
        next: Function
    ): Promise<void> {
        const restaurant_id = req.params["id"];
        const dish_id = req.params["dishid"];

        let query_string = "UPDATE DISHES SET ";

        Object.entries(req.body).forEach(([property, value], index) => {
            if (index) query_string += ",";
            query_string += `${property}='${value}' `;
        });

        query_string += `WHERE RESTAURANT_ID=${restaurant_id} AND ID=${dish_id};`;

        try {
            const query_result = await client.query(query_string);

            if (!query_result.rowCount) throw new Error();
        } catch (e) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error");
            return Promise.resolve();
        }

        res.status(StatusCodes.OK).send("");

        next();
    },
    deleteDish: async function (
        req: Request,
        res: Response,
        next: Function
    ): Promise<void> {
        const restaurant_id = req.params["id"];
        const dish_id = req.params["dishid"];

        try {
            const query_result = await client.query(
                "DELETE FROM DISHES WHERE RESTAURANT_ID=$1 AND ID=$2",
                [restaurant_id, dish_id]
            );

            if (!query_result.rowCount) throw new Error();
        } catch (e) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error");
            return Promise.resolve();
        }

        res.status(StatusCodes.NO_CONTENT).send("");

        next();
    },
    getDishesByRestaurant: async function (
        req: Request,
        res: Response,
        next: Function
    ): Promise<void> {
        const restaurant_id = req.params["id"];
        let query_result;

        try {
            query_result = await client.query(
                "SELECT * FROM DISHES WHERE RESTAURANT_ID=$1",
                [restaurant_id]
            );
        } catch (e) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Internal Server Error");
            return Promise.resolve();
        }

        res.status(StatusCodes.OK).send(query_result.rows);

        next();
    },
};

export default Handler;
