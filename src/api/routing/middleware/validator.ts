import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { validate, ValidateIf, ValidationOptions } from "class-validator";
import { RequestDTO } from "../../typing/api";
import {
    RATINGS_REQUESTS,
    RESTAURANTS_REQUESTS,
    DISHES_REQUESTS,
    ORDERS_REQUESTS,
} from "../../typing/api";

type RequestType =
    | keyof typeof RESTAURANTS_REQUESTS
    | keyof typeof RATINGS_REQUESTS
    | keyof typeof DISHES_REQUESTS
    | keyof typeof ORDERS_REQUESTS;

export const validateSyntax = <T extends RequestType>( // TODO: This is incorrect.
    requestType: T,
    requestTypeToDTO: Record<T, RequestDTO>
) => {
    const routeDTO = requestTypeToDTO[requestType].routeDTO;
    const bodyDTO = requestTypeToDTO[requestType].bodyDTO;
    const queryDTO = requestTypeToDTO[requestType].queryDTO;

    // This is the returned middleware function
    return async function (req: Request, res: Response, next: NextFunction) {
        const routeObj = new routeDTO(req.route);
        const bodyObj = new bodyDTO(req.body);
        const queryObj = new queryDTO(req.query);

        const routeErrors = await validate(routeObj, {
            forbidUnknownValues: true,
        });

        const bodyErrors = await validate(bodyObj, {
            forbidUnknownValues: true,
        });

        const queryErrors = await validate(queryObj, {
            forbidUnknownValues: true,
        });

        if (routeErrors.length || bodyErrors.length || queryErrors.length) {
            const errorMessages = `${routeErrors} \n ${bodyErrors} \n ${queryErrors}} `;
            return res.status(StatusCodes.BAD_REQUEST).json({ error: errorMessages });
        }
        next();
    };
};

// export const validateInput = async (
//     req: Request,
//     res: Response,
//     next: Function,
//     dto_object: Object,
//     skipMissingProperties: boolean,
//     allowEmpty: boolean,
//     callNext: boolean = true,
//     body: any = null
// ): Promise<boolean> => {
//     if (!allowEmpty && !Object.keys(req.body).length) {
//         res.status(StatusCodes.BAD_REQUEST).send("Request body can not be empty");
//         return Promise.resolve(false);
//     }

//     if (!body) Object.assign(dto_object, req.body);
//     else Object.assign(dto_object, body);

//     const errors = await validate(dto_object, {
//         skipMissingProperties: skipMissingProperties,
//         whitelist: true,
//         forbidNonWhitelisted: true,
//         validationError: {
//             target: false,
//             value: false,
//         },
//     });

//     if (errors.length) {
//         res.status(StatusCodes.BAD_REQUEST).send(errors);
//         return Promise.resolve(false);
//     }

//     if (callNext) next();

//     return Promise.resolve(true);
// };

export function IsOptionalNonNullable(data?: { validationOptions?: ValidationOptions }) {
    const { validationOptions = undefined } = data || {};

    return ValidateIf((ob: any, v: any) => {
        return v !== undefined;
    }, validationOptions);
}
