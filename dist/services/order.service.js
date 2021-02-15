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
const index_1 = require("../models/index");
const errorResponse_1 = require("../config/errorResponse");
class OrderService {
    constructor() {
        this.createOrder = (orderData) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const order = new index_1.Order({
                    userId: orderData.userId,
                    productId: orderData.productId,
                    productQuantity: orderData.productQuantity,
                    orderDate: new Date()
                });
                order.save().then(result => {
                    if (result) {
                        console.log(result);
                        resolve({ isSuccess: true, result });
                    }
                    else {
                        resolve({ isSuccess: false,
                            message: errorResponse_1.default.errorHandler(errorResponse_1.default.resourceNotFound, "Databse Issue!")
                        });
                    }
                }).caught(error => {
                    console.log(error);
                    resolve({ isSuccess: false, error });
                });
            }));
        };
        this.getAllOrderByUser = (userId) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                //find all Order from database
                index_1.Order.findAll({ include: [index_1.Product, index_1.User], order: [['createdAt', 'DESC']], where: { userId: userId } }).then(result => {
                    if (result) {
                        console.log(result);
                        resolve({ isSuccess: true, result });
                    }
                    else {
                        resolve({ isSuccess: false,
                            message: errorResponse_1.default.errorHandler(errorResponse_1.default.resourceNotFound, "Data Not Found!")
                        });
                    }
                }).caught(error => {
                    console.log(error);
                    resolve({ isSuccess: false, error });
                });
            }));
        };
        this.getOrderById = (orderId) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                //finding one Order from database
                index_1.Order.findOne({ include: [index_1.Product, index_1.User], order: [['createdAt', 'DESC']], where: { id: orderId } })
                    .then(result => {
                    if (result) {
                        console.log(result);
                        resolve({ isSuccess: true, result });
                    }
                    else {
                        resolve({ isSuccess: false,
                            message: errorResponse_1.default.errorHandler(errorResponse_1.default.resourceNotFound, "Data Not Found!")
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
exports.OrderService = OrderService;
