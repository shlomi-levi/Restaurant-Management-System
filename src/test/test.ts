process.env.NODE_ENV = "test";

import request from "supertest";
import app from "../index";
import { server } from "../index";
import * as restaurantMocks from "./mocks/restaurant";
import * as dishesMocks from "./mocks/dishes";
import * as ordersMocks from "./mocks/orders";
import * as ratingsMocks from "./mocks/ratings";
import { StatusCodes } from "http-status-codes";
// import client from "../db/db";

let restaurantToDeleteId: number;
let restaurantToTestId: number;

const cleanUp = async () => {
    // TODO: Redo all of this.
    // await client.query("TRUNCATE TABLE RESTAURANTS CASCADE");
    // await client.query("TRUNCATE TABLE RATINGS CASCADE");
    // await client.query("TRUNCATE TABLE DISHES CASCADE");
    // await client.query("TRUNCATE TABLE ORDERS CASCADE");
    // await client.query("TRUNCATE TABLE ORDERITEM CASCADE");
    // await client.end();
};

function getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

describe("Restaurants API", () => {
    describe("Add restaurants", () => {
        test("Should respond with a 201 status twice", async () => {
            const res1 = await request(app)
                .post("/restaurants")
                .send(
                    restaurantMocks.createRestaurantReq("Taizu", false, [
                        "Asian",
                        "Mexican",
                        "Indian",
                    ])
                );

            const res2 = await request(app)
                .post("/restaurants")
                .send(
                    restaurantMocks.createRestaurantReq("Vieta", true, [
                        "Chinese",
                        "Israeli",
                    ])
                );

            expect(res1.statusCode).toBe(StatusCodes.CREATED);
            expect(res2.statusCode).toBe(StatusCodes.CREATED);
        });
    });

    describe("Get all restaurants", () => {
        test("Should respond with a 200 status code and an array of 2 json objects", async () => {
            const res = await request(app).get("/restaurants").send();
            expect(res.statusCode).toBe(StatusCodes.OK);
            expect(res.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(res.body).toHaveLength(2);
            restaurantToDeleteId = res.body[0].id;
            restaurantToTestId = res.body[1].id;
        });
    });

    describe("Get restaurants by cuisine", () => {
        test("Should respond with a 200 status code and an array containing 1 json object", async () => {
            const res = await request(app)
                .get("/restaurants")
                .query({
                    cuisine: "Chinese",
                })
                .send();
            expect(res.statusCode).toBe(StatusCodes.OK);
            expect(res.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(res.body).toHaveLength(1);
        });
    });

    describe("Get restaurant by id", () => {
        test("Should respond with a 200 status code and json object", async () => {
            const res = await request(app)
                .get("/restaurants/" + restaurantToTestId)
                .send();
            expect(res.statusCode).toBe(StatusCodes.OK);
            expect(res.headers["content-type"]).toEqual(expect.stringContaining("json"));
            expect(res.body).toHaveLength(1);
        });
    });

    describe("Update a restaurant", () => {
        test("Should respond with a 200 status code and empty content", async () => {
            const res = await request(app)
                .put("/restaurants/" + restaurantToTestId)
                .send({ cuisines: ["Vietnamese"] });
            expect(res.statusCode).toBe(StatusCodes.OK);
            expect(res.body).toEqual({});
        });
    });

    describe("Delete a restaurant", () => {
        test("Should respond with a 204 status code and empty content", async () => {
            const res = await request(app)
                .delete("/restaurants/" + restaurantToDeleteId)
                .send();
            expect(res.statusCode).toBe(StatusCodes.NO_CONTENT);
            expect(res.body).toEqual({});
        });
    });
});

let dishToDeleteId: number;
let dishToTestId: number;

describe("Add two dishes", () => {
    test("Should respond with status code 201 and empty content", async () => {
        let res = await request(app)
            .post(`/restaurants/${restaurantToTestId}/dishes`)
            .send(dishesMocks.createDishReq("Shakshuka", "Great one", 34));

        expect(res.statusCode).toBe(StatusCodes.CREATED);
        expect(res.body).toEqual({});

        res = await request(app)
            .post(`/restaurants/${restaurantToTestId}/dishes`)
            .send(dishesMocks.createDishReq("Matbuha", "Decent one", 15));
        expect(res.statusCode).toBe(StatusCodes.CREATED);
        expect(res.body).toEqual({});
    });
});

describe("Get dishes by restaurant", () => {
    test("Should respond with an array containing 2 objects", async () => {
        const res = await request(app)
            .get(`/restaurants/${restaurantToTestId}/dishes`)
            .send();

        expect(res.headers["content-type"]).toEqual(expect.stringContaining("json"));
        expect(res.statusCode).toBe(StatusCodes.OK);
        expect(res.body).toHaveLength(2);

        dishToDeleteId = res.body[0].id;
        dishToTestId = res.body[1].id;
    });
});

describe("Update dish", () => {
    test("Should respond with code 200 and empty body", async () => {
        const res = await request(app)
            .put(`/restaurants/${restaurantToTestId}/dishes/${dishToTestId}`)
            .send({ description: "Awesome one" });

        expect(res.statusCode).toBe(StatusCodes.OK);
        expect(res.body).toEqual({});
    });
});

describe("Delete dish", () => {
    test("Should respond with code 204 and empty body", async () => {
        const res = await request(app)
            .delete(`/restaurants/${restaurantToTestId}/dishes/${dishToDeleteId}`)
            .send();

        expect(res.statusCode).toBe(StatusCodes.NO_CONTENT);
        expect(res.body).toEqual({});
    });
});

describe("Add an order", () => {
    test("Should respond with code 200 and a object containing order id", async () => {
        const res = await request(app)
            .post("/order")
            .send(
                ordersMocks.createOrderReq(restaurantToTestId, [
                    { dishId: dishToTestId, amount: 14 },
                ])
            );

        expect(res.statusCode).toBe(StatusCodes.OK);
        expect(res.body.orderId).toBeDefined();
    });
});

describe("Add ratings to a restaurant and verify average rating", () => {
    let sum = 0;
    const num_of_ratings = Math.floor(getRandomArbitrary(5, 10));

    test("Should respond with code 200", async () => {
        for (let i = 0; i < num_of_ratings; i++) {
            let random_rating_value = getRandomArbitrary(1, 5);
            let res = await request(app)
                .post("/ratings")
                .send(
                    ratingsMocks.createRatingReq(restaurantToTestId, random_rating_value)
                );

            expect(res.statusCode).toBe(StatusCodes.OK);
            expect(res.body).toEqual({});

            sum += random_rating_value;
        }
    });

    test("Should return the correct average", async () => {
        const average = sum / num_of_ratings;

        const res = await request(app).get(`/restaurants/${restaurantToTestId}`).send();

        expect(res.statusCode).toBe(StatusCodes.OK);
        expect(res.body[0].averagerating).toBeDefined();
        expect(res.body[0].averagerating.toFixed(3)).toEqual(average.toFixed(3));
    });
});

afterAll((done) => {
    cleanUp();
    server.close();
    done();
});
