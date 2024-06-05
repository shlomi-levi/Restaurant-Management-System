export const createRatingReq = (restaurantId: number, rating: number) => {
    return {
        restaurantId,
        rating,
    };
};
