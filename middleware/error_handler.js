import { CustomAPIError } from "../errors/custom_error.js"

export const errorHandlerMiddleware = (err,req,res,next) => {
    if(err instanceof CustomAPIError){
        return res.status(err.statusCode).json({message:err.message})
    }
    return res.status(500).json({message:"invalid data"})
}