"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const md5_1 = require("ts-md5/dist/md5");
const errorResponse_1 = require("../config/errorResponse");
const index_1 = require("../models/index");
class UserService {
    constructor() {
        this.verifyUser = (email, password) => {
            //console.log(email)
            let encryptPass = md5_1.Md5.hashStr(password);
            //console.log(encryptPass);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                index_1.User.findOne({ attributes: { exclude: ['password'] }, where: { email: email,
                        password: encryptPass } }).then(result => {
                    console.log(result);
                    if (result != null) {
                        console.log(result.phoneNo);
                        resolve({ isSuccess: true, result });
                    }
                    else {
                        resolve({ isSuccess: false,
                            message: errorResponse_1.default.errorHandler(errorResponse_1.default.resourceNotFound, "Invalid crendentials")
                        });
                    }
                }).caught(error => {
                    console.log(error);
                    resolve({ isSuccess: false, message: errorResponse_1.default.errorHandler(errorResponse_1.default.resourceNotFound, "SOMETHING_WENT_WRONG") });
                });
            }));
        };
        this.registerUser = (userData) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                userData.email = userData.email.trim();
                userData.password = userData.password.trim();
                index_1.User.findOne({ where: { email: userData.email } }).then(result => {
                    if (result) {
                        console.log(result.phoneNo);
                        resolve({ isSuccess: false,
                            message: errorResponse_1.default.errorHandler(errorResponse_1.default.resourceNotFound, "Email address is already registered")
                        });
                    }
                    else {
                        let user = new index_1.User({
                            name: userData.name,
                            email: userData.email,
                            phoneNo: userData.phoneNo,
                            password: md5_1.Md5.hashStr(userData.password),
                            address: userData.address
                        });
                        user.save().then(userResult => {
                            if (userResult) {
                                resolve({ isSuccess: true, userResult });
                            }
                            else {
                                resolve({ isSuccess: false,
                                    message: errorResponse_1.default.errorHandler(errorResponse_1.default.resourceNotFound, "SOMETHING_WENT_WRONG")
                                });
                            }
                        }).caught(error => {
                            console.log(error);
                            resolve({ isSuccess: false, error });
                        });
                    }
                }).caught(error => {
                    console.log(error);
                    resolve({ isSuccess: false, error });
                });
            }));
        };
    }
}
exports.UserService = UserService;
