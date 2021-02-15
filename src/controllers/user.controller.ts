import {Path,POST} from "typescript-rest";
import {Tags} from 'typescript-rest-swagger';
import {UserLogInModel, UserRegisterModel } from "../models/interfaces/User.interface"
import {UserService} from '../services/user.service'
import {generateToken} from "../config/JWTAuth"
import customResponse from "../config/globalResponse"
import customError from "../config/errorResponse"

@Path('/user')
export class UserController{
    private userService:UserService;
    constructor(){
        this.userService = new UserService();
    }

    /**
     * @description : Check the provided credential's are match with existing user or not
                    if matches then send the user data and a token for authorization
     * @param userData 
    */
    @POST
    @Path('/login')
    @Tags('Account')
    public async verifyUserController(userData:UserLogInModel):  Promise<any>{
        try{     
            //#endregion Validation
            if(!userData.email){
                return customError.errorHandler(customError.ServiceUnavailable,"REQUEST_ERROR_EMAIL");
            } 
            if(!userData.password){
                return customError.errorHandler(customError.ServiceUnavailable,"REQUEST_ERROR_PASSWORD");
            }            
            //#region                                          
            const user:any = await this.userService.verifyUser(userData.email,userData.password);
            if(user.isSuccess){                
                console.log(user.result.id)                
                const userToken = await generateToken(user.result.id, 'user')
                customResponse.isSuccess=true;
                customResponse.data = {userToken,user}
                customResponse.error ={ error :"",errorDescription : ""}
                return customResponse;
            }else{
                return customError.errorHandler(customError.resourceNotFound,"Invalid username or password");
            }
        }catch (e){
            return customError.errorHandler(customError.ServiceUnavailable,"SOMETHING_WENT_WRONG");
        }
    }

    /**
     * @description : create a new user in database 
     * @param userData 
    */
    @POST
    @Path('/register')
    @Tags('Account')    
    public async registerUserController(userData:UserRegisterModel): Promise<any> {
        try{           
            //#endregion Validation
            if(!userData.email){
                return customError.errorHandler(customError.ServiceUnavailable,"REQUEST_ERROR_EMAIL");
            } 
            if(!userData.password){
                return customError.errorHandler(customError.ServiceUnavailable,"REQUEST_ERROR_PASSWORD");
            }            
            if(!userData.name){
                return customError.errorHandler(customError.ServiceUnavailable,"REQUEST_ERROR_NAME");
            }            
            if(!userData.phoneNo){
                return customError.errorHandler(customError.ServiceUnavailable,"REQUEST_ERROR_PHONE_NO");
            }            
            if(!userData.address){
                return customError.errorHandler(customError.ServiceUnavailable,"REQUEST_ERROR_ADDRESS");
            }            
            //#region  
            const user:any = await this.userService.registerUser(userData);            
            if(user.isSuccess){
                customResponse.isSuccess=true;
                customResponse.data = user
                customResponse.error ={ error :"",errorDescription : ""}
                return customResponse;
            }else{
                
                return user.message;
            }
        }catch(e){
            return customError.errorHandler(customError.ServiceUnavailable,"SOMETHING_WENT_WRONG");
        }
    }
}



