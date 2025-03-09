import { IsString, IsNumber, IsInt, Min, IsNotEmpty } from "class-validator";
import { IsOptionalNonNullable } from "../../routing/middleware/validator";
import { DISHES_REQUESTS, RequestDTO, EmptyClass } from "../api";

type RequestTypes = keyof typeof DISHES_REQUESTS;

export class addDishBodyDTO {
    @IsString({
        message: "Name of dish must be a string",
    })
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
    @IsOptionalNonNullable()
    @IsNotEmpty({ message: "name must contain a value" })
    @IsString({ message: "dish name must be a string" })
    name?: string;

    @IsOptionalNonNullable()
    @IsNotEmpty({ message: "name must contain a value" })
    @IsString({ message: "dish description must be a string" })
    description?: string;

    @IsOptionalNonNullable()
    @IsNotEmpty({ message: "price must contain a value" })
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

export const requestTypeToDTO: Record<RequestTypes, RequestDTO> = {
    ADD_DISH: {
        routeDTO: addDishRouteDTO,
        bodyDTO: addDishBodyDTO,
        queryDTO: EmptyClass,
    },

    UPDATE_DISH: {
        routeDTO: updateDishRouteDTO,
        bodyDTO: updateDishBodyDTO,
        queryDTO: EmptyClass,
    },

    DELETE_DISH: {
        routeDTO: deleteDishRouteDTO,
        bodyDTO: EmptyClass,
        queryDTO: EmptyClass,
    },

    GET_DISHES_BY_RESTAURANT: {
        routeDTO: getDishesByRestaurantRouteDTO,
        bodyDTO: EmptyClass,
        queryDTO: EmptyClass,
    },
};
