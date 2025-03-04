CREATE TABLE "dishes" (
	"restaurant_id" integer,
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "dishes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(60) NOT NULL,
	"description" varchar(200) NOT NULL,
	"price" real
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"order_id" uuid,
	"dish_id" integer,
	"amount" integer
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"order_timestamp" timestamp
);
--> statement-breakpoint
CREATE TABLE "ratings" (
	"restaurant_id" integer,
	"rating" real,
	CONSTRAINT "rating_check" CHECK ("ratings"."rating" >= 1 AND "ratings"."rating" <= 5)
);
--> statement-breakpoint
CREATE TABLE "restaurants" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "restaurants_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(60) NOT NULL,
	"avg_rating" real,
	"is_kosher" boolean NOT NULL,
	"cuisines" text[],
	CONSTRAINT "avg_rating_check" CHECK ("restaurants"."avg_rating" >= 1 and "restaurants"."avg_rating" <= 5)
);
--> statement-breakpoint
ALTER TABLE "dishes" ADD CONSTRAINT "dishes_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_dish_id_dishes_id_fk" FOREIGN KEY ("dish_id") REFERENCES "public"."dishes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ratings" ADD CONSTRAINT "ratings_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE cascade ON UPDATE no action;