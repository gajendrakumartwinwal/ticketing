import { CustomError } from "./CustomError";
export declare class NotFoundError extends CustomError {
    reason: string;
    constructor();
    statusCode: number;
    serializeErrors(): {
        message: string;
        field?: string;
    }[];
}
