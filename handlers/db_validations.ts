import client from "../db/db";

export const orderIdExists = async (order_id: string): Promise<boolean> => {
    const query_result = await client.query("SELECT * FROM ORDERS WHERE ID=$1", [
        order_id,
    ]);

    if (!query_result.rowCount) return Promise.resolve(false);

    return Promise.resolve(true);
};

export const checkDishExistence = async (
    restaurant_id: string,
    dish_id: string
): Promise<boolean> => {
    const query_result = await client.query(
        "SELECT * FROM DISHES WHERE RESTAURANT_ID=$1 AND ID=$2",
        [restaurant_id, dish_id]
    );

    if (!query_result.rowCount) return Promise.resolve(false);

    return Promise.resolve(true);
};

export const checkRestaurantExistence = async (
    restaurant_id: string
): Promise<boolean> => {
    const query_result = await client.query("SELECT * FROM RESTAURANTS WHERE ID=$1", [
        restaurant_id,
    ]);

    if (!query_result.rowCount) return Promise.resolve(false);

    return Promise.resolve(true);
};
