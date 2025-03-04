import {
    boolean,
    integer,
    pgTable,
    real,
    timestamp,
    uuid,
    varchar,
    text,
    check,
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm";

export const restaurants = pgTable(
    "restaurants",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        name: varchar({ length: 60 }).notNull(),
        avg_rating: real(),
        isKosher: boolean().notNull(),
        cuisines: text().array().notNull(),
    },
    (table) => [
        check(
            "avg_rating_check",
            sql`${table.avg_rating} >= 1 and ${table.avg_rating} <= 5`
        ),
    ]
);

export const ratings = pgTable(
    "ratings",
    {
        restaurant_id: integer()
            .references(() => restaurants.id, {
                onDelete: "cascade",
            })
            .notNull(),
        rating: real().notNull(),
    },
    (table) => [
        check("rating_check", sql`${table.rating} >= 1 AND ${table.rating} <= 5`),
    ]
);

export const dishes = pgTable("dishes", {
    restaurant_id: integer()
        .references(() => restaurants.id, { onDelete: "cascade" })
        .notNull(),
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 60 }).notNull(),
    description: varchar({ length: 200 }).notNull(),
    price: real().notNull(),
});

export const orders = pgTable("orders", {
    id: uuid().primaryKey().defaultRandom(),
    order_timestamp: timestamp().defaultNow(),
});

export const orderItems = pgTable("order_items", {
    order_id: uuid()
        .references(() => orders.id, { onDelete: "cascade" })
        .notNull(),
    dish_id: integer()
        .references(() => dishes.id, { onDelete: "cascade" })
        .notNull(),
    amount: integer().notNull(),
});
