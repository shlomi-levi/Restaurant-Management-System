import { Request, Response } from "express";

interface ratingsInterface {
    handleNewRating: (req: Request, res: Response, next: Function) => void;
}

export default ratingsInterface;
