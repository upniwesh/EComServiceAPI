import {Path,POST, GET,QueryParam, Security, ContextRequest} from "typescript-rest";
import {Tags,} from 'typescript-rest-swagger';
import {ProductModel} from "../models/interfaces/Product.interface"
import {ProductService} from "../services/product.service"
import customResponse from "../config/globalResponse"
import customError from "../config/errorResponse"
import { Request } from 'express';

@Path("/Product")
export class ProductController{
    private productService:ProductService;
    constructor(){
        this.productService = new ProductService();
    }

    /**
     * @description : create new Product in database
     * @param productData 
     */
    @POST
    @Path('/create')
    @Tags("Product")
    @Security()
    public async createProduct(productData:ProductModel):Promise<any> {
        try{
            //#endregion Validation
            if(!productData.productName){
                return customError.errorHandler(customError.ServiceUnavailable,"REQUEST_ERROR_PRODUCT_NAME");
            } 
            if(!productData.productPrice){
                return customError.errorHandler(customError.ServiceUnavailable,"REQUEST_ERROR_PRODUCT_PRICE");
            }            
            if(!productData.productDescription){
                return customError.errorHandler(customError.ServiceUnavailable,"REQUEST_ERROR_PRODUCT_DESCRIPTION");
            }            
            if(!productData.productLaunchedYear || productData.productLaunchedYear === 0){
                return customError.errorHandler(customError.ServiceUnavailable,"REQUEST_ERROR_PRODUCT_LAUNCHED_YEAR");
            }            
            //#region 
            const product : any = await this.productService.createProduct(productData);
            if(product.isSuccess){
                customResponse.isSuccess=true;
                customResponse.data = product
                customResponse.error ={ error :"",errorDescription : ""}
                return customResponse;
            }else{
                return customError.errorHandler(customError.resourceNotFound,"Failed to create Product");
            }
        }catch (e){
            console.log(e)
            return customError.errorHandler(customError.ServiceUnavailable,"DATABASE_ERROR");
        }
    }
     /**
     * @description : GEt all products from database
     * @param productData 
     */
    @GET
    @Path('/getAll')
    @Tags("Product")
    @Security()
    public async getAllProductController(@ContextRequest request: Request):Promise<any> {
        try{
            console.log('customer details')
            console.log(request.user)
            const product : any = await this.productService.getAllProduct(request.user.userId);
            if(product.isSuccess){
                customResponse.isSuccess=true;
                customResponse.data = product
                customResponse.error ={ error :"",errorDescription : ""}
                return customResponse;
            }else{
                return customError.errorHandler(customError.resourceNotFound,"There is no product");
            }
        }catch(e){
            return customError.errorHandler(customError.ServiceUnavailable,"DATABASE_ERROR");
        }
    }
     /**
     * @description : Get one product by his Id
     * @param productData 
     */
    @GET
    @Path('/getById')
    @Tags("Product")
    @Security()
    public async getProductByIdController(@QueryParam("productId") productId:string):Promise<any> {
        try{
            //#endregion Validation
            if(!productId || Number(productId) == 0){
                return customError.errorHandler(customError.ServiceUnavailable,"REQUEST_ERROR_PRODUCT_ID");
            }                        
            //#region 
            const product:any = await this.productService.getProductById(productId);
            if(product.isSuccess){
                customResponse.isSuccess=true;
                customResponse.data = product;
                customResponse.error ={ error :"",errorDescription : ""}
                return customResponse;
            }else{
                return product.message
            }
        }catch(e){
            return customError.errorHandler(customError.ServiceUnavailable,"DATABASE_ERROR");
        }
    } 
}
