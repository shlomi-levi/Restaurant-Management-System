import { IsInt, IsNumber, Min, Max } from "class-validator";
import { EmptyClass, RATINGS_REQUESTS, RequestDTO } from "../api";

type RequestTypes = keyof typeof RATINGS_REQUESTS;

export class addRatingBodyDTO {
    @IsInt({ message: "restaurantId must be an integer" })
    restaurantId: number;

    @IsNumber(undefined, { message: "rating must be a number" })
    @Min(1, { message: "rating must be between 1 and 5" })
    @Max(5, { message: "rating must be between 1 and 5" })
    rating: number;
}

export const requestTypeToDTO: Record<RequestTypes, RequestDTO> = {
    ADD_RATING: {
        routeDTO: EmptyClass,
        bodyDTO: addRatingBodyDTO,
        queryDTO: EmptyClass,
    },
};
