import { IsInt, IsNumber, Min, Max } from "class-validator";

export class addRatingBodyDTO {
    @IsInt()
    restaurantId: number;

    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;
}
