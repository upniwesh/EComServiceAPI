import customResponse from "./globalResponse"

/**
 * Genearate Custom Error When Something went wrong
 */
const customError = {
    badRequest:400,
    notAuthorized:401,
    Forbidden:403,
    resourceNotFound :404,
    authenticationError: 401,
    internalServerError:500,
    ServiceUnavailable:503,
    errorHandler: (type:any , message:any) => {
        customResponse.data = {};
        customResponse.error = {
        error:type,
        errorDescription: message
        }
        customResponse.isSuccess=false;
        return customResponse;
    }
}

export default customError;