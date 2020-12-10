import {CustomError} from "./CustomError";

export class NonAuthorisedError extends CustomError {
    constructor() {
        super('User is not authorised!');
        Object.setPrototypeOf(this, NonAuthorisedError.prototype);
    }

    statusCode: number = 401;

    serializeErrors(): { message: string; field?: string }[] {
        return [{
            message: 'Not authorised!'
        }]
    }
}
