import { CustomError } from "./CustomError";
export declare class BadRequestError extends CustomError {
    constructor(message: string);
    statusCode: number;
    serializeErrors(): {
        message: string;
        field?: string;
    }[];
}
