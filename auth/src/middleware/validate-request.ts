import {NextFunction, Request, Response} from "express";
import {CustomError} from "../error/CustomError";
import {validationResult} from "express-validator";
import {DatabaseValidationError} from "../error/DatabaseValidationError";
import {RequestValidationError} from "../error/RequestValidationError";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(errors){
        throw new RequestValidationError(errors.array());
    }
    next();
};

export {validateRequest}
