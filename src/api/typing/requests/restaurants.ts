import { IsString, IsBoolean, IsInt, IsArray } from "class-validator";

export class getRestaurantsByCuisineQueryDTO {
    @IsString()
    cuisine: string;
}

export class getRestaurantsByIdRouteDTO {
    @IsInt()
    id: number;
}

export class addNewRestaurantBodyDTO {
    @IsString()
    name: string;

    @IsBoolean()
    isKosher: boolean;

    @IsArray()
    @IsString({ each: true })
    cuisines: string[];
}

export class updateRestaurantBodyDTO {
    @IsString()
    name?: string;

    @IsBoolean()
    isKosher?: boolean;

    @IsArray()
    @IsString({ each: true })
    cuisines?: string[];
}

export class updateRestaurantRouteDTO {
    @IsInt()
    id: number;
}

export class deleteRestaurantRouteDTO {
    @IsInt()
    id: number;
}
