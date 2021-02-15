export interface UserRegisterModel {     
    name: string;  
    email: string;
    phoneNo: string;
    password : string;
    address : string;
}

export interface UserLogInModel {
    email: string;    
    password:string;
}
