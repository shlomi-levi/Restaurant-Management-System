enum API {
    RESTAURANTS = 1,
    RATINGS = 2,
    ORDERS = 3,
    DISHES = 4,
}

enum RESTAURANTS_REQUESTS {
    GET_ALL_RESTAURANTS,
    GET_RESTAURANTS_BY_CUISINE,
    GET_RESTAURANT_BY_ID,
    ADD_RESTAURANT,
    UPDATE_RESTAURANT,
    DELETE_RESTAURANT,
}

enum RATINGS_REQUESTS {
    ADD_RATING,
}

enum ORDERS_REQUESTS {
    ADD_ORDER,
}

enum DISHES_REQUESTS {
    ADD_DISH,
    UPDATE_DISH,
    DELETE_DISH,
    GET_DISHES_BY_RESTAURANT,
}

export const apiToRequestTypes = {
    RESTAURANTS: RESTAURANTS_REQUESTS,
    RATINGS: RATINGS_REQUESTS,
    ORDERS: ORDERS_REQUESTS,
    DISHES: DISHES_REQUESTS,
} as const;

export const requestTypeToDTO {
    
}

// I want a API -> Request type mapper
// and I also want an Request type -> Request DTO mapper
