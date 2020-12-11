import { CustomError } from "./CustomError";
export declare class DatabaseValidationError extends CustomError {
    reason: string;
    constructor();
    statusCode: number;
    serializeErrors(): {
        message: string;
        field?: string;
    }[];
}
