import {Request, Response, NextFunction} from "express";
import {RequestValidationError} from "../error/RequestValidationError";
import {DatabaseValidationError} from "../error/DatabaseValidationError";

 const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof RequestValidationError){
        const formatedError = err.errors.map((error) =>{
            return {
                message: error.msg,
                field: error.param
            }
        });

        return res.status(400).send(formatedError);
    }
     if(err instanceof DatabaseValidationError){
         const formatedError = [{
             message: err.reason,
             field: 'DB'
         }];

         return res.status(400).send(formatedError);
     }

    res.status(400).send({
        message: err.message
    });
};

 export {errorHandler}
