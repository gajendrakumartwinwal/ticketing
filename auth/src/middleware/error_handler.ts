import {NextFunction, Request, Response} from "express";
import {CustomError} from "../error/CustomError";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send({errors: err.serializeErrors()});
    }
    res.status(400).send([
        {
            message: 'Something went wrong!'
        }
    ]);
};

export {errorHandler}
