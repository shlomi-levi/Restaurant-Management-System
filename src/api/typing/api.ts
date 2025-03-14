export const enum API {
    RESTAURANTS = 1,
    RATINGS = 2,
    ORDERS = 3,
    DISHES = 4,
}

export enum RESTAURANTS_REQUESTS {
    GET_ALL_RESTAURANTS = 5,
    GET_RESTAURANTS_BY_CUISINE = 6,
    GET_RESTAURANT_BY_ID = 7,
    ADD_RESTAURANT = 8,
    UPDATE_RESTAURANT = 9,
    DELETE_RESTAURANT = 10,
}

export enum RATINGS_REQUESTS {
    ADD_RATING = 11,
}

export enum ORDERS_REQUESTS {
    ADD_ORDER = 12,
}

export enum DISHES_REQUESTS {
    ADD_DISH = 13,
    UPDATE_DISH = 14,
    DELETE_DISH = 15,
    GET_DISHES_BY_RESTAURANT = 16,
}

// export const apiToRequestTypes = {
//     RESTAURANTS: RESTAURANTS_REQUESTS,
//     RATINGS: RATINGS_REQUESTS,
//     ORDERS: ORDERS_REQUESTS,
//     DISHES: DISHES_REQUESTS,
// } as const;

export type RequestDTO = {
    routeDTO: new () => any;
    bodyDTO: new () => any;
    queryDTO: new () => any;
};

export class EmptyClass {}
