"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_rest_1 = require("typescript-rest");
const typescript_rest_swagger_1 = require("typescript-rest-swagger");
const user_service_1 = require("../services/user.service");
const JWTAuth_1 = require("../config/JWTAuth");
const globalResponse_1 = require("../config/globalResponse");
const errorResponse_1 = require("../config/errorResponse");
let UserController = class UserController {
    constructor() {
        this.userService = new user_service_1.UserService();
    }
    /**
     * @description : Check the provided credential's are match with existing user or not
                    if matches then send the user data and a token for authorization
     * @param userData
    */
    verifyUserController(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //#endregion Validation
                if (!userData.email) {
                    return errorResponse_1.default.errorHandler(errorResponse_1.default.ServiceUnavailable, "REQUEST_ERROR_EMAIL");
                }
                if (!userData.password) {
                    return errorResponse_1.default.errorHandler(errorResponse_1.default.ServiceUnavailable, "REQUEST_ERROR_PASSWORD");
                }
                //#region                                          
                const user = yield this.userService.verifyUser(userData.email, userData.password);
                if (user.isSuccess) {
                    console.log(user.result.id);
                    const userToken = yield JWTAuth_1.generateToken(user.result.id, 'user');
                    globalResponse_1.default.isSuccess = true;
                    globalResponse_1.default.data = { userToken, user };
                    globalResponse_1.default.error = { error: "", errorDescription: "" };
                    return globalResponse_1.default;
                }
                else {
                    return errorResponse_1.default.errorHandler(errorResponse_1.default.resourceNotFound, "Invalid username or password");
                }
            }
            catch (e) {
                return errorResponse_1.default.errorHandler(errorResponse_1.default.ServiceUnavailable, "SOMETHING_WENT_WRONG");
            }
        });
    }
    /**
     * @description : create a new user in database
     * @param userData
    */
    registerUserController(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //#endregion Validation
                if (!userData.email) {
                    return errorResponse_1.default.errorHandler(errorResponse_1.default.ServiceUnavailable, "REQUEST_ERROR_EMAIL");
                }
                if (!userData.password) {
                    return errorResponse_1.default.errorHandler(errorResponse_1.default.ServiceUnavailable, "REQUEST_ERROR_PASSWORD");
                }
                if (!userData.name) {
                    return errorResponse_1.default.errorHandler(errorResponse_1.default.ServiceUnavailable, "REQUEST_ERROR_NAME");
                }
                if (!userData.phoneNo) {
                    return errorResponse_1.default.errorHandler(errorResponse_1.default.ServiceUnavailable, "REQUEST_ERROR_PHONE_NO");
                }
                if (!userData.address) {
                    return errorResponse_1.default.errorHandler(errorResponse_1.default.ServiceUnavailable, "REQUEST_ERROR_ADDRESS");
                }
                //#region  
                const user = yield this.userService.registerUser(userData);
                if (user.isSuccess) {
                    globalResponse_1.default.isSuccess = true;
                    globalResponse_1.default.data = user;
                    globalResponse_1.default.error = { error: "", errorDescription: "" };
                    return globalResponse_1.default;
                }
                else {
                    return user.message;
                }
            }
            catch (e) {
                return errorResponse_1.default.errorHandler(errorResponse_1.default.ServiceUnavailable, "SOMETHING_WENT_WRONG");
            }
        });
    }
};
__decorate([
    typescript_rest_1.POST,
    typescript_rest_1.Path('/login'),
    typescript_rest_swagger_1.Tags('Account'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verifyUserController", null);
__decorate([
    typescript_rest_1.POST,
    typescript_rest_1.Path('/register'),
    typescript_rest_swagger_1.Tags('Account'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "registerUserController", null);
UserController = __decorate([
    typescript_rest_1.Path('/user'),
    __metadata("design:paramtypes", [])
], UserController);
exports.UserController = UserController;
