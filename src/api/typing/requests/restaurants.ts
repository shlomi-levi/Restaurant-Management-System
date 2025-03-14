import { IsString, IsBoolean, IsInt, IsArray, IsNotEmpty } from "class-validator";
import { IsOptionalNonNullable } from "../../routing/middleware/validation/validator";
import { RESTAURANTS_REQUESTS, RequestDTO, EmptyClass } from "../api";

export class getRestaurantsByCuisineQueryDTO {
    @IsString({ message: "cuisine must be a string" })
    cuisine: string;
}

export class getRestaurantsByIdRouteDTO {
    @IsInt({ message: "id must be an integer" })
    id: number;
}

export class verifyRestaurantExistenceDTO extends getRestaurantsByIdRouteDTO {} // Same

export class addNewRestaurantBodyDTO {
    @IsString({ message: "restaurant name must be a string" })
    name: string;

    @IsBoolean({ message: "isKosher must be a boolean" })
    isKosher: boolean;

    @IsArray({ message: "cuisines must be an array of strings" })
    @IsString({ each: true, message: "cuisines must be an array of strings" })
    cuisines: string[];
}

export class updateRestaurantBodyDTO {
    @IsOptionalNonNullable()
    @IsNotEmpty({ message: "restaurant name must contain a value " })
    @IsString({ message: "restaurant name must be a string" })
    name?: string;

    @IsOptionalNonNullable()
    @IsNotEmpty({ message: "isKosher name must contain a value" })
    @IsBoolean({ message: "isKosher must be a boolean" })
    isKosher?: boolean;

    @IsOptionalNonNullable()
    @IsNotEmpty({ message: "cuisines name must contain a value" })
    @IsArray({ message: "cuisines must be an array of strings" })
    @IsString({ each: true, message: "cuisines must be an array of strings" })
    cuisines?: string[];
}

export class updateRestaurantRouteDTO {
    @IsInt({ message: "Route parameter {id} must be an integer" })
    id: number;
}

export class deleteRestaurantRouteDTO {
    @IsInt({ message: "Route parameter {id} must be an integer" })
    id: number;
}

export const requestTypeToDTO: Record<RESTAURANTS_REQUESTS, RequestDTO> = {
    [RESTAURANTS_REQUESTS.GET_ALL_RESTAURANTS]: {
        routeDTO: EmptyClass,
        bodyDTO: EmptyClass,
        queryDTO: EmptyClass,
    },

    [RESTAURANTS_REQUESTS.GET_RESTAURANTS_BY_CUISINE]: {
        routeDTO: EmptyClass,
        bodyDTO: EmptyClass,
        queryDTO: getRestaurantsByCuisineQueryDTO,
    },

    [RESTAURANTS_REQUESTS.GET_RESTAURANT_BY_ID]: {
        routeDTO: getRestaurantsByIdRouteDTO,
        bodyDTO: EmptyClass,
        queryDTO: EmptyClass,
    },

    [RESTAURANTS_REQUESTS.ADD_RESTAURANT]: {
        routeDTO: EmptyClass,
        bodyDTO: addNewRestaurantBodyDTO,
        queryDTO: EmptyClass,
    },

    [RESTAURANTS_REQUESTS.UPDATE_RESTAURANT]: {
        routeDTO: updateRestaurantRouteDTO,
        bodyDTO: updateRestaurantBodyDTO,
        queryDTO: EmptyClass,
    },

    [RESTAURANTS_REQUESTS.DELETE_RESTAURANT]: {
        routeDTO: deleteRestaurantRouteDTO,
        bodyDTO: EmptyClass,
        queryDTO: EmptyClass,
    },
};
