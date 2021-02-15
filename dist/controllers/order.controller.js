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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const order_service_1 = require("../services/order.service");
const globalResponse_1 = require("../config/globalResponse");
const errorResponse_1 = require("../config/errorResponse");
let OrderController = class OrderController {
    constructor() {
        this.orderService = new order_service_1.OrderService();
    }
    /**
     * @description : create new Order in database
     * @param OrderData
     */
    createOrder(orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //#endregion Validation
                if (!orderData.productId) {
                    return errorResponse_1.default.errorHandler(errorResponse_1.default.ServiceUnavailable, "REQUEST_ERROR_PRODUCT_ID");
                }
                if (!orderData.userId) {
                    return errorResponse_1.default.errorHandler(errorResponse_1.default.ServiceUnavailable, "REQUEST_ERROR_USER_ID");
                }
                if (orderData.productQuantity <= 0) {
                    return errorResponse_1.default.errorHandler(errorResponse_1.default.ServiceUnavailable, "REQUEST_ERROR_PRODUCT_QUNATITY");
                }
                //#region 
                const order = yield this.orderService.createOrder(orderData);
                if (order.isSuccess) {
                    globalResponse_1.default.isSuccess = true;
                    globalResponse_1.default.data = order;
                    globalResponse_1.default.error = { error: "", errorDescription: "" };
                    return globalResponse_1.default;
                }
                else {
                    return errorResponse_1.default.errorHandler(errorResponse_1.default.resourceNotFound, "Failed to create Order");
                }
            }
            catch (e) {
                console.log(e);
                return errorResponse_1.default.errorHandler(errorResponse_1.default.ServiceUnavailable, "DATABASE_ERROR");
            }
        });
    }
    /**
    * @description : GEt all Orders from database
    * @param OrderData
    */
    getAllOrderByUserController(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('customer details');
                console.log(request.user);
                const order = yield this.orderService.getAllOrderByUser(request.user.userId);
                if (order.isSuccess) {
                    globalResponse_1.default.isSuccess = true;
                    globalResponse_1.default.data = order;
                    globalResponse_1.default.error = { error: "", errorDescription: "" };
                    return globalResponse_1.default;
                }
                else {
                    return errorResponse_1.default.errorHandler(errorResponse_1.default.resourceNotFound, "There is no Order");
                }
            }
            catch (e) {
                return errorResponse_1.default.errorHandler(errorResponse_1.default.ServiceUnavailable, "DATABASE_ERROR");
            }
        });
    }
    /**
    * @description : Get one Order by his Id
    * @param OrderData
    */
    getOrderByIdController(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //#endregion Validation
                if (!orderId || Number(orderId) == 0) {
                    return errorResponse_1.default.errorHandler(errorResponse_1.default.ServiceUnavailable, "REQUEST_ERROR_Order_ID");
                }
                //#region 
                const order = yield this.orderService.getOrderById(orderId);
                if (order.isSuccess) {
                    globalResponse_1.default.isSuccess = true;
                    globalResponse_1.default.data = order;
                    globalResponse_1.default.error = { error: "", errorDescription: "" };
                    return globalResponse_1.default;
                }
                else {
                    return order.message;
                }
            }
            catch (e) {
                return errorResponse_1.default.errorHandler(errorResponse_1.default.ServiceUnavailable, "DATABASE_ERROR");
            }
        });
    }
};
__decorate([
    typescript_rest_1.POST,
    typescript_rest_1.Path('/create'),
    typescript_rest_swagger_1.Tags("order"),
    typescript_rest_1.Security(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    typescript_rest_1.GET,
    typescript_rest_1.Path('/getAllOrderByUser'),
    typescript_rest_swagger_1.Tags("order"),
    typescript_rest_1.Security(),
    __param(0, typescript_rest_1.ContextRequest),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getAllOrderByUserController", null);
__decorate([
    typescript_rest_1.GET,
    typescript_rest_1.Path('/getById'),
    typescript_rest_swagger_1.Tags("order"),
    typescript_rest_1.Security(),
    __param(0, typescript_rest_1.QueryParam("OrderId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrderByIdController", null);
OrderController = __decorate([
    typescript_rest_1.Path("/order"),
    __metadata("design:paramtypes", [])
], OrderController);
exports.OrderController = OrderController;
