import { IsInt, IsNumber, Min, Max } from "class-validator";

export class addRatingBodyDTO {
    @IsInt({ message: "restaurantId must be an integer" })
    restaurantId: number;

    @IsNumber(undefined, { message: "rating must be a number" })
    @Min(1, { message: "rating must be between 1 and 5" })
    @Max(5, { message: "rating must be between 1 and 5" })
    rating: number;
}
