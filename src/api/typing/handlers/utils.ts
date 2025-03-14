import { Request, Response } from "express";

export type Handler<ReqBody = {}, QueryParameters = {}> = (
    req: Request<any, any, ReqBody, QueryParameters>,
    res: Response,
    next: Function
) => Promise<void>;

export default Handler;
