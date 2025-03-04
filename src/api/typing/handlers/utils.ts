import { Request, Response } from "express";

export type Handler<RouteParameters = {}, ReqBody = {}, QueryParameters = {}> = (
    req: Request<RouteParameters, any, ReqBody, QueryParameters>,
    res: Response,
    next: Function
) => Promise<void>;

export default Handler;
