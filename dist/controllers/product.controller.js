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
const product_service_1 = require("../services/product.service");
const globalResponse_1 = require("../config/globalResponse");
const errorResponse_1 = require("../config/errorResponse");
let ProductController = class ProductController {
    constructor() {
        this.productService = new product_service_1.ProductService();
    }
    /**
     * @description : create new Product in database
     * @param productData
     */
    createProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //#endregion Validation
                if (!productData.productName) {
                    return errorResponse_1.default.errorHandler(errorResponse_1.default.ServiceUnavailable, "REQUEST_ERROR_PRODUCT_NAME");
                }
                if (!productData.productPrice) {
                    return errorResponse_1.default.errorHandler(errorResponse_1.default.ServiceUnavailable, "REQUEST_ERROR_PRODUCT_PRICE");
                }
                if (!productData.productDescription) {
                    return errorResponse_1.default.errorHandler(errorResponse_1.default.ServiceUnavailable, "REQUEST_ERROR_PRODUCT_DESCRIPTION");
                }
                if (!productData.productLaunchedYear || productData.productLaunchedYear === 0) {
                    return errorResponse_1.default.errorHandler(errorResponse_1.default.ServiceUnavailable, "REQUEST_ERROR_PRODUCT_LAUNCHED_YEAR");
                }
                //#region 
                const product = yield this.productService.createProduct(productData);
                if (product.isSuccess) {
                    globalResponse_1.default.isSuccess = true;
                    globalResponse_1.default.data = product;
                    globalResponse_1.default.error = { error: "", errorDescription: "" };
                    return globalResponse_1.default;
                }
                else {
                    return errorResponse_1.default.errorHandler(errorResponse_1.default.resourceNotFound, "Failed to create Product");
                }
            }
            catch (e) {
                console.log(e);
                return errorResponse_1.default.errorHandler(errorResponse_1.default.ServiceUnavailable, "DATABASE_ERROR");
            }
        });
    }
    /**
    * @description : GEt all products from database
    * @param productData
    */
    getAllProductController(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('customer details');
                console.log(request.user);
                const product = yield this.productService.getAllProduct(request.user.userId);
                if (product.isSuccess) {
                    globalResponse_1.default.isSuccess = true;
                    globalResponse_1.default.data = product;
                    globalResponse_1.default.error = { error: "", errorDescription: "" };
                    return globalResponse_1.default;
                }
                else {
                    return errorResponse_1.default.errorHandler(errorResponse_1.default.resourceNotFound, "There is no product");
                }
            }
            catch (e) {
                return errorResponse_1.default.errorHandler(errorResponse_1.default.ServiceUnavailable, "DATABASE_ERROR");
            }
        });
    }
    /**
    * @description : Get one product by his Id
    * @param productData
    */
    getProductByIdController(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //#endregion Validation
                if (!productId || Number(productId) == 0) {
                    return errorResponse_1.default.errorHandler(errorResponse_1.default.ServiceUnavailable, "REQUEST_ERROR_PRODUCT_ID");
                }
                //#region 
                const product = yield this.productService.getProductById(productId);
                if (product.isSuccess) {
                    globalResponse_1.default.isSuccess = true;
                    globalResponse_1.default.data = product;
                    globalResponse_1.default.error = { error: "", errorDescription: "" };
                    return globalResponse_1.default;
                }
                else {
                    return product.message;
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
    typescript_rest_swagger_1.Tags("Product"),
    typescript_rest_1.Security(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    typescript_rest_1.GET,
    typescript_rest_1.Path('/getAll'),
    typescript_rest_swagger_1.Tags("Product"),
    typescript_rest_1.Security(),
    __param(0, typescript_rest_1.ContextRequest),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProductController", null);
__decorate([
    typescript_rest_1.GET,
    typescript_rest_1.Path('/getById'),
    typescript_rest_swagger_1.Tags("Product"),
    typescript_rest_1.Security(),
    __param(0, typescript_rest_1.QueryParam("productId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProductByIdController", null);
ProductController = __decorate([
    typescript_rest_1.Path("/Product"),
    __metadata("design:paramtypes", [])
], ProductController);
exports.ProductController = ProductController;
