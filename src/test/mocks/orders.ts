export const createOrderReq = (restaurantId: number, orderItems: object[]) => {
    return {
        restaurantId,
        orderItems,
    };
};
