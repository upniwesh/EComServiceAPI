import {Path,POST, GET,QueryParam, Security, ContextRequest} from "typescript-rest";
import {Tags,} from 'typescript-rest-swagger';
import {OrderModel} from "../models/interfaces/Order.interface"
import {OrderService} from "../services/order.service"
import customResponse from "../config/globalResponse"
import customError from "../config/errorResponse"
import { Request } from 'express';

@Path("/order")
export class OrderController{
    private orderService:OrderService;
    constructor(){
        this.orderService = new OrderService();
    }

    /**
     * @description : create new Order in database
     * @param OrderData 
     */
    @POST
    @Path('/create')
    @Tags("order")
    @Security()
    public async createOrder(orderData:OrderModel):Promise<any> {
        try{
            //#endregion Validation
            if(!orderData.productId){
                return customError.errorHandler(customError.ServiceUnavailable,"REQUEST_ERROR_PRODUCT_ID");
            } 
            if(!orderData.userId){
                return customError.errorHandler(customError.ServiceUnavailable,"REQUEST_ERROR_USER_ID");
            }   
            if(orderData.productQuantity <= 0){
                return customError.errorHandler(customError.ServiceUnavailable,"REQUEST_ERROR_PRODUCT_QUNATITY");
            }            
            //#region 
            const order : any = await this.orderService.createOrder(orderData);
            if(order.isSuccess){
                customResponse.isSuccess=true;
                customResponse.data = order
                customResponse.error ={ error :"",errorDescription : ""}
                return customResponse;
            }else{
                return customError.errorHandler(customError.resourceNotFound,"Failed to create Order");
            }
        }catch (e){
            console.log(e)
            return customError.errorHandler(customError.ServiceUnavailable,"DATABASE_ERROR");
        }
    }
     /**
     * @description : GEt all Orders from database
     * @param OrderData 
     */
    @GET
    @Path('/getAllOrderByUser')
    @Tags("order")
    @Security()
    public async getAllOrderByUserController(@ContextRequest request: Request):Promise<any> {
        try{
            console.log('customer details')
            console.log(request.user)
            const order : any = await this.orderService.getAllOrderByUser(request.user.userId);
            if(order.isSuccess){
                customResponse.isSuccess=true;
                customResponse.data = order
                customResponse.error ={ error :"",errorDescription : ""}
                return customResponse;
            }else{
                return customError.errorHandler(customError.resourceNotFound,"There is no Order");
            }
        }catch(e){
            return customError.errorHandler(customError.ServiceUnavailable,"DATABASE_ERROR");
        }
    }
     /**
     * @description : Get one Order by his Id
     * @param OrderData 
     */
    @GET
    @Path('/getById')
    @Tags("order")
    @Security()
    public async getOrderByIdController(@QueryParam("OrderId") orderId:string):Promise<any> {
        try{
            //#endregion Validation
            if(!orderId || Number(orderId) == 0){
                return customError.errorHandler(customError.ServiceUnavailable,"REQUEST_ERROR_Order_ID");
            }                        
            //#region 
            const order:any = await this.orderService.getOrderById(orderId);
            if(order.isSuccess){
                customResponse.isSuccess=true;
                customResponse.data = order;
                customResponse.error ={ error :"",errorDescription : ""}
                return customResponse;
            }else{
                return order.message
            }
        }catch(e){
            return customError.errorHandler(customError.ServiceUnavailable,"DATABASE_ERROR");
        }
    } 
}
