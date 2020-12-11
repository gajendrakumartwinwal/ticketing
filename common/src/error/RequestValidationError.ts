import {ValidationError} from "express-validator";
import {CustomError} from "./CustomError";

export class RequestValidationError extends CustomError {
    errors: ValidationError[]
    statusCode = 400;

    constructor(private err: ValidationError[]) {
        super('Invalid request parameters!');
        this.errors = err;
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors = () => {
        return this.errors.map((error) => {
            return {
                message: error.msg,
                field: error.param
            }
        });
    }
}
