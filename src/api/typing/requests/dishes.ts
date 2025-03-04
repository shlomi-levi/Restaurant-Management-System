import { IsString, IsNumber, Min } from "class-validator";

export class addDishBodyDTO {
    @IsString()
    // @NotContains("'")
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    @Min(0)
    price: number;
}

export class addDishRouteDTO {
    @IsNumber()
    id: number; // restaurant id
}

export class updateDishBodyDTO {
    @IsString()
    name?: string;

    @IsString()
    description?: string;

    @IsNumber()
    @Min(0)
    price?: number;
}

export class updateDishRouteDTO extends addDishRouteDTO {
    @IsNumber()
    dishId: number;
}

export class deleteDishRouteDTO extends updateDishRouteDTO {}

export class getDishesByRestaurantRouteDTO extends addDishRouteDTO {}
