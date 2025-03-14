import { IsArray, IsInt, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ORDERS_REQUESTS, RequestDTO, EmptyClass } from "../api";

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

export const requestTypeToDTO: Record<ORDERS_REQUESTS, RequestDTO> = {
    [ORDERS_REQUESTS.ADD_ORDER]: {
        routeDTO: EmptyClass,
        bodyDTO: addOrderBodyDTO,
        queryDTO: EmptyClass,
    },
};
