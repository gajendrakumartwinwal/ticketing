import { Request, Response, NextFunction } from 'express';
import {NonAuthorisedError} from "../error/NonAuthorisedError";

export const requreAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.currentUser) {
        throw new NonAuthorisedError();
    }
    next();
};
