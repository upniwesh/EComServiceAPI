"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalResponse_1 = require("./globalResponse");
/**
 * Genearate Custom Error When Something went wrong
 */
const customError = {
    badRequest: 400,
    notAuthorized: 401,
    Forbidden: 403,
    resourceNotFound: 404,
    authenticationError: 401,
    internalServerError: 500,
    ServiceUnavailable: 503,
    errorHandler: (type, message) => {
        globalResponse_1.default.data = {};
        globalResponse_1.default.error = {
            error: type,
            errorDescription: message
        };
        globalResponse_1.default.isSuccess = false;
        return globalResponse_1.default;
    }
};
exports.default = customError;
