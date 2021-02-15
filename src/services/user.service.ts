import {Md5} from 'ts-md5/dist/md5';
import customError from "../config/errorResponse"
import {} from "../config/constant"
import { UserRegisterModel } from '../models/interfaces/User.interface';
import {User} from '../models/index';
export class UserService{
    public verifyUser = (email:string,password:string)=> {
        //console.log(email)
        let encryptPass = <string>Md5.hashStr(password);
        //console.log(encryptPass);
        return new Promise(async (resolve,reject) => { 
            User.findOne({attributes: { exclude: ['password'] }, where: {email: email, 
                password : encryptPass }}).then(result =>{
                    console.log(result);
                    if(result != null){
                        console.log(result.phoneNo);                        
                        resolve({ isSuccess: true, result}); 
                    }
                    else{
                        resolve({ isSuccess: false, 
                            message: customError.errorHandler(customError.resourceNotFound, "Invalid crendentials") 
                        }); 
                    } 
                }).caught(error =>{
                    console.log(error);
                    resolve({isSuccess : false, message: customError.errorHandler(customError.resourceNotFound, "SOMETHING_WENT_WRONG") })
                });            
        })
    }
    
    public registerUser = (userData:UserRegisterModel) => {
        return new Promise(async(resolve, reject) => {
            userData.email = userData.email.trim()            
            userData.password = userData.password.trim()                       
            
            User.findOne({ where: { email  : userData.email }}).then(result =>{
                    if(result){
                        console.log(result.phoneNo);
                        resolve({ isSuccess: false, 
                            message: customError.errorHandler(customError.resourceNotFound, "Email address is already registered") 
                        });
                    }
                    else{                        
                        let user = new User({
                            name : userData.name,
                            email : userData.email,
                            phoneNo : userData.phoneNo,
                            password : Md5.hashStr(userData.password),
                            address : userData.address                                                      
                        })
                        user.save().then(userResult => {
                            if(userResult){   
                                resolve({ isSuccess: true, userResult});                        
                            }else{
                                resolve({ isSuccess: false, 
                                    message: customError.errorHandler(customError.resourceNotFound, "SOMETHING_WENT_WRONG") 
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

        });
    }
}
