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
exports.DatabaseValidationError = void 0;
var CustomError_1 = require("./CustomError");
var DatabaseValidationError = /** @class */ (function (_super) {
    __extends(DatabaseValidationError, _super);
    function DatabaseValidationError() {
        var _this = _super.call(this, 'Error connecting to DB') || this;
        _this.reason = 'Database is not running!';
        _this.statusCode = 500;
        Object.setPrototypeOf(_this, DatabaseValidationError.prototype);
        return _this;
    }
    DatabaseValidationError.prototype.serializeErrors = function () {
        return [{
                message: this.reason
            }];
    };
    return DatabaseValidationError;
}(CustomError_1.CustomError));
exports.DatabaseValidationError = DatabaseValidationError;
