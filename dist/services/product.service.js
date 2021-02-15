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
class ProductService {
    constructor() {
        this.createProduct = (productData) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                //productData.productName = productData.productName.trim();
                index_1.Product.findOne({ where: { productName: productData.productName } })
                    .then(productResult => {
                    if (productResult) {
                        resolve({ isSuccess: false,
                            message: errorResponse_1.default.errorHandler(errorResponse_1.default.resourceNotFound, "Product already Exist")
                        });
                    }
                    else {
                        //create new product in database
                        const product = new index_1.Product({
                            productName: productData.productName.trim(),
                            productDescription: productData.productDescription || "",
                            productPrice: productData.productPrice,
                            productLaunchedYear: productData.productLaunchedYear
                        });
                        product.save().then(result => {
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
                    }
                }).caught(error => {
                    console.log(error);
                    resolve({ isSuccess: false, error });
                });
            }));
        };
        this.getAllProduct = (userId) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                //find all product from database
                index_1.Product.findAll().then(result => {
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
        this.getProductById = (productId) => {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                //finding one product from database
                index_1.Product.findOne({ where: { id: productId } })
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
exports.ProductService = ProductService;
