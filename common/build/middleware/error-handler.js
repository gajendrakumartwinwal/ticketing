"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var CustomError_1 = require("../error/CustomError");
var errorHandler = function (err, req, res, next) {
    if (err instanceof CustomError_1.CustomError) {
        return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    console.log('GAJENDRA', err);
    res.status(400).send([
        {
            message: 'Something went wrong!'
        }
    ]);
};
exports.errorHandler = errorHandler;
