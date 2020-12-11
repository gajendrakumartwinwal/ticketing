import { CustomError } from "./CustomError";
export declare class NonAuthorisedError extends CustomError {
    constructor();
    statusCode: number;
    serializeErrors(): {
        message: string;
        field?: string;
    }[];
}
