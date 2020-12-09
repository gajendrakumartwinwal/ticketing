import {ValidationError} from "express-validator";

export class RequestValidationError extends CustomError {
    errors: ValidationError[]
    statusCode = 400;

    constructor(private err: ValidationError[]) {
        super();
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
