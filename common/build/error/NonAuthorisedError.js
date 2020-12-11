"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonAuthorisedError = void 0;
var CustomError_1 = require("./CustomError");
var NonAuthorisedError = /** @class */ (function (_super) {
    __extends(NonAuthorisedError, _super);
    function NonAuthorisedError() {
        var _this = _super.call(this, 'User is not authorised!') || this;
        _this.statusCode = 401;
        Object.setPrototypeOf(_this, NonAuthorisedError.prototype);
        return _this;
    }
    NonAuthorisedError.prototype.serializeErrors = function () {
        return [{
                message: 'Not authorised!'
            }];
    };
    return NonAuthorisedError;
}(CustomError_1.CustomError));
exports.NonAuthorisedError = NonAuthorisedError;
