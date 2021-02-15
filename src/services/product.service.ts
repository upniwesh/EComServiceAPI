import {Product} from "../models/index"
import { ProductModel } from "../models/interfaces/Product.interface"
import customError from "../config/errorResponse"

export class ProductService{
    public createProduct = (productData:ProductModel) => {
        return new Promise(async (resolve,reject) => {
            
            //productData.productName = productData.productName.trim();
            Product.findOne({where : {productName : productData.productName}})
            .then(productResult =>{
                if(productResult){
                    resolve({ isSuccess: false, 
                        message: customError.errorHandler(customError.resourceNotFound, "Product already Exist") 
                    });
                }else{
                    //create new product in database
                    const product = new Product({
                        productName: productData.productName.trim(),                
                        productDescription : productData.productDescription || "",
                        productPrice : productData.productPrice, 
                        productLaunchedYear : productData.productLaunchedYear                                                                                                
                    })
                    product.save().then(result =>{
                        if(result){
                            console.log(result);                                                         
                            resolve({ isSuccess: true, result}); 
                        }else{
                            resolve({ isSuccess: false, 
                                message: customError.errorHandler(customError.resourceNotFound, "Databse Issue!") 
                            });
                        }            
                    }).caught(error =>{
                        console.log(error);
                        resolve({isSuccess : false, error})
                    });
                }
            }).caught(error =>{
                console.log(error);
                resolve({isSuccess : false, error})
            });            
        })
    }
    
    public getAllProduct = (userId : string) => {
        return new Promise(async (resolve,reject) => {   
            
            //find all product from database
            Product.findAll().then(result =>{
                if(result){
                    console.log(result);                    
                    resolve({ isSuccess: true, result}); 
                }
                else{
                    resolve({ isSuccess: false, 
                        message: customError.errorHandler(customError.resourceNotFound, "Data Not Found!") 
                    }); 
                }
            }).caught(error =>{
                console.log(error);
                resolve({isSuccess : false, error})
            });           
        })
    }
    
    public getProductById = (productId:string) => {
        return new Promise(async (resolve,reject) => {
            //finding one product from database
            Product.findOne({ where: { id: productId } })
            .then(result =>{
                if(result){
                    console.log(result);
                    resolve({ isSuccess: true, result}); 
                }
                else{
                    resolve({ isSuccess: false, 
                        message: customError.errorHandler(customError.resourceNotFound, "Data Not Found!") 
                    }); 
                } 
            }).caught(error =>{
                console.log(error);
                resolve({isSuccess : false, error})
            });
        })
    }              
}
