import { ValidationError} from "express-validator";

export class RequestValidationError extends Error{
    errors: ValidationError[]
    constructor(private err: ValidationError[]){
        super();
        this.errors = err;
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
}