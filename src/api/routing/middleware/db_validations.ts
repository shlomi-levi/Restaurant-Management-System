import { db } from "../db";
import * as schema from "../drizzle/schema";
import { eq, and } from "drizzle-orm";

export const orderIdExists = async (order_id: string): Promise<boolean> => {
    const res = await db
        .select()
        .from(schema.orders)
        .where(eq(schema.orders.id, order_id));

    if (!res) return Promise.resolve(false);

    return Promise.resolve(true);
};

export const dishExists = async (
    restaurant_id: number,
    dish_id: number
): Promise<boolean> => {
    const res = await db
        .select()
        .from(schema.dishes)
        .where(
            and(
                eq(schema.dishes.restaurant_id, restaurant_id),
                eq(schema.dishes.id, dish_id)
            )
        );

    if (!res) return Promise.resolve(false);

    return Promise.resolve(true);
};

export const restaurantExists = async (restaurant_id: number): Promise<boolean> => {
    const res = await db
        .select()
        .from(schema.restaurants)
        .where(eq(schema.restaurants.id, restaurant_id));

    if (!res) return Promise.resolve(false);

    return Promise.resolve(true);
};
