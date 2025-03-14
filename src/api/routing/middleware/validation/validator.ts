import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { validate, ValidateIf, ValidationOptions } from "class-validator";
import { plainToInstance } from "class-transformer";
import { RequestDTO } from "../../../typing/api";

export const baseValidateSyntax = (dtos_object: RequestDTO) => {
    const routeDTO = dtos_object.routeDTO;
    const bodyDTO = dtos_object.bodyDTO;
    const queryDTO = dtos_object.queryDTO;

    // This is the returned middleware function
    return async function (req: Request, res: Response, next: NextFunction) {
        const routeObj = plainToInstance(routeDTO, req.route);
        const bodyObj = plainToInstance(bodyDTO, req.body);
        const queryObj = plainToInstance(queryDTO, req.query);

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

export function IsOptionalNonNullable(data?: { validationOptions?: ValidationOptions }) {
    const { validationOptions = undefined } = data || {};

    return ValidateIf((ob: any, v: any) => {
        return v !== undefined;
    }, validationOptions);
}
