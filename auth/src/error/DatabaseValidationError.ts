import { ValidationError} from "express-validator";

export class DatabaseValidationError extends Error{
    reason = 'Database is not running!';
    constructor(){
        super();
        Object.setPrototypeOf(this, DatabaseValidationError.prototype);
    }
}