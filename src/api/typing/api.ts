export const API = {
    RESTAURANTS: 1,
    RATINGS: 2,
    ORDERS: 3,
    DISHES: 4,
} as const;

export const RESTAURANTS_REQUESTS = {
    GET_ALL_RESTAURANTS: 1,
    GET_RESTAURANTS_BY_CUISINE: 2,
    GET_RESTAURANT_BY_ID: 3,
    ADD_RESTAURANT: 4,
    UPDATE_RESTAURANT: 5,
    DELETE_RESTAURANT: 6,
} as const;

export const RATINGS_REQUESTS = {
    ADD_RATING: 1,
} as const;

export const ORDERS_REQUESTS = {
    ADD_ORDER: 1,
} as const;

export const DISHES_REQUESTS = {
    ADD_DISH: 1,
    UPDATE_DISH: 2,
    DELETE_DISH: 3,
    GET_DISHES_BY_RESTAURANT: 4,
} as const;

export const apiToRequestTypes = {
    RESTAURANTS: RESTAURANTS_REQUESTS,
    RATINGS: RATINGS_REQUESTS,
    ORDERS: ORDERS_REQUESTS,
    DISHES: DISHES_REQUESTS,
} as const;

export type RequestDTO = {
    routeDTO: any;
    bodyDTO: any;
    queryDTO: any;
};

export class EmptyClass {}
