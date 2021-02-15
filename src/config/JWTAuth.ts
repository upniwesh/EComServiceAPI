import {sign} from "jsonwebtoken"
import secretKey from "./constant"

export const generateToken = (userId:any, role : any) => {
    return new Promise((resolve,reject) => {
        const payload = {
            userId,
            role
        }
        const token = sign(payload,secretKey);
        resolve(token)
    })
}


