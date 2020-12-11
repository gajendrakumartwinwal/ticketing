import {CustomError} from "./CustomError";

export class NotFoundError extends CustomError {
    reason = 'Route not found!';
    constructor() {
        super('Error connecting to DB');
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }

    statusCode: number = 404;

    serializeErrors(): { message: string; field?: string }[] {
        return [{
            message: this.reason
        }]
    }
}
