import {NextFunction, Request, Response} from "express";
import {RequestValidationError} from "../error/RequestValidationError";
import {DatabaseValidationError} from "../error/DatabaseValidationError";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof RequestValidationError) {

        return res.status(err.statusCode).send({errors: err.serializeErrors()});
    }
    if (err instanceof DatabaseValidationError) {

        return res.status(err.statusCode).send({errors: err.serializeErrors()});
    }

    res.status(400).send([
            {
                message: 'Something went wrong!'
            }
        ]);
};

export {errorHandler}
