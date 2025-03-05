import { IsString, IsBoolean, IsInt, IsArray } from "class-validator";

export class getRestaurantsByCuisineQueryDTO {
    @IsString({ message: "cuisine must be a string" })
    cuisine: string;
}

export class getRestaurantsByIdRouteDTO {
    @IsInt({ message: "id must be an integer" })
    id: number;
}

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
    @IsString({ message: "restaurant name must be a string" })
    name?: string;

    @IsBoolean({ message: "isKosher must be a boolean" })
    isKosher?: boolean;

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
