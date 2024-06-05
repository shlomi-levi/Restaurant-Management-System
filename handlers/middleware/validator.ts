import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { validate } from "class-validator";

export const validateInput = async (
    req: Request,
    res: Response,
    next: Function,
    dto_object: Object,
    skipMissingProperties: boolean,
    allowEmpty: boolean,
    callNext: boolean = true,
    body: any = null
): Promise<boolean> => {
    if (!allowEmpty && !Object.keys(req.body).length) {
        res.status(StatusCodes.BAD_REQUEST).send("Request body can not be empty");
        return Promise.resolve(false);
    }

    if (!body) Object.assign(dto_object, req.body);
    else Object.assign(dto_object, body);

    const errors = await validate(dto_object, {
        skipMissingProperties: skipMissingProperties,
        whitelist: true,
        forbidNonWhitelisted: true,
        validationError: {
            target: false,
            value: false,
        },
    });

    if (errors.length) {
        res.status(StatusCodes.BAD_REQUEST).send(errors);
        return Promise.resolve(false);
    }

    if (callNext) next();

    return Promise.resolve(true);
};
