import { ValidationError } from "express-validator";
import { CustomError } from "./CustomError";
export declare class RequestValidationError extends CustomError {
    private err;
    errors: ValidationError[];
    statusCode: number;
    constructor(err: ValidationError[]);
    serializeErrors: () => {
        message: any;
        field: string;
    }[];
}
