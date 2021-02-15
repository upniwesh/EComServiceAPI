import {Order, User, Product} from "../models/index"
import { OrderModel } from "../models/interfaces/Order.interface"
import customError from "../config/errorResponse"

export class OrderService{
    public createOrder = (orderData:OrderModel) => {
        return new Promise(async (resolve,reject) => {
                        
            const order = new Order({
                userId: orderData.userId,
                productId : orderData.productId,
                productQuantity : orderData.productQuantity, 
                orderDate : new Date()                                                                                               
            })
            order.save().then(result =>{
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
        })
    }
    
    public getAllOrderByUser = (userId : string) => {
        return new Promise(async (resolve,reject) => {   
            
            //find all Order from database
            Order.findAll({include: [Product, User], order: [['createdAt', 'DESC']], where: { userId: userId }}).then(result =>{
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
    
    public getOrderById = (orderId:string) => {
        return new Promise(async (resolve,reject) => {
            //finding one Order from database
            Order.findOne({include: [Product, User], order: [['createdAt', 'DESC']], where: { id: orderId } })
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
