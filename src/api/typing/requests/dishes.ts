import { IsString, IsNumber, IsInt, Min } from "class-validator";

export class addDishBodyDTO {
    @IsString({
        message: "Name of dish must be a string",
    })
    // @NotContains("'")
    name: string;

    @IsString()
    description: string;

    @IsNumber(undefined, {
        message: "price must be a number",
    })
    @Min(0, {
        message: "dish price can not be negative number",
    })
    price: number;
}

export class addDishRouteDTO {
    @IsInt({
        message: "restaurant id must be an integer",
    })
    id: number; // Restaurant id
}

export class updateDishBodyDTO {
    @IsString({ message: "dish name must be a string" })
    name?: string;

    @IsString({ message: "dish description must be a string" })
    description?: string;

    @IsNumber(undefined, { message: "dish price must be a number" })
    @Min(0, {
        message: "dish price can not be a negative number",
    })
    price?: number;
}

export class updateDishRouteDTO extends addDishRouteDTO {
    @IsInt({ message: "dishId must be an integer" })
    dishId: number;
}

export class deleteDishRouteDTO extends updateDishRouteDTO {}

export class getDishesByRestaurantRouteDTO extends addDishRouteDTO {}
