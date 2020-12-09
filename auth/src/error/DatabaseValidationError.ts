import {CustomError} from "./CustomError";

export class DatabaseValidationError extends CustomError {
    reason = 'Database is not running!';
    constructor() {
        super();
        Object.setPrototypeOf(this, DatabaseValidationError.prototype);
    }

    statusCode: number = 500;

    serializeErrors(): { message: string; field?: string }[] {
        return [{
            message: this.reason
        }]
    }


}
