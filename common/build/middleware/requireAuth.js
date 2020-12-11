"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requreAuth = void 0;
var NonAuthorisedError_1 = require("../error/NonAuthorisedError");
var requreAuth = function (req, res, next) {
    if (!req.currentUser) {
        throw new NonAuthorisedError_1.NonAuthorisedError();
    }
    next();
};
exports.requreAuth = requreAuth;
