import { IsArray, IsInt, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class orderItemsDTO {
    @IsInt()
    dishId: number;

    @IsInt()
    amount: number;
}

export class addOrderBodyDTO {
    @IsInt()
    restaurantId: number;

    @IsArray() // TODO: Check if validate nested worked.
    @ValidateNested({ each: true })
    @Type(() => orderItemsDTO)
    orderItems: orderItemsDTO[];
}
