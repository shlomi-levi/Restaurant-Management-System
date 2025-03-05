import { IsArray, IsInt, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class orderItemsDTO {
    @IsInt({ message: "dishId must be an integer" })
    dishId: number;

    @IsInt({ message: "amount must be an integer" })
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
