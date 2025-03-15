import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { validate, ValidateIf, ValidationOptions } from "class-validator";
import { RequestDTO, EmptyClass } from "../../../typing/api";

class myClass {}

export const baseValidateSyntax = (dtos_object: RequestDTO) => {
    const routeDTO = dtos_object.routeDTO;
    const bodyDTO = dtos_object.bodyDTO;
    const queryDTO = dtos_object.queryDTO;

    // This is the returned middleware function
    return async function (req: Request, res: Response, next: NextFunction) {
        const routeObj = new routeDTO();
        Object.assign(routeObj, req.route);

        const bodyObj = new bodyDTO();
        Object.assign(bodyObj, req.body);

        const queryObj = new queryDTO();
        Object.assign(queryObj, req.query);

        /* Handle validation of empty classes, since class-validator doesn't support that as of now */

        // TODO: handle route validation later. route has 3 keys, I'm interested in the path key.

        const emptyClassHackArray = [
            {
                obj: bodyObj,
                name: "body",
            },
            {
                obj: queryObj,
                name: "query",
            },
        ];

        for (const elem of emptyClassHackArray) {
            if (elem.obj instanceof EmptyClass && Object.keys(elem.obj).length > 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    error: `${elem.name} must be empty`,
                });
            }
        }

        /* */
        const routeErrors: any = [];
        // const routeErrors = await validate(routeObj, {
        //     forbidUnknownValues: true,
        // });

        const bodyErrors =
            bodyObj instanceof EmptyClass
                ? []
                : await validate(bodyObj, {
                      whitelist: true,
                      forbidNonWhitelisted: true,
                  });

        const queryErrors =
            queryObj instanceof EmptyClass
                ? []
                : await validate(queryObj, {
                      whitelist: true,
                      forbidNonWhitelisted: true,
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

export const getObjectNumericKeys = (obj: Object) =>
    Object.keys(obj).filter((key) => !isNaN(Number(key)));
