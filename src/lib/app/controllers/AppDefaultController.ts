import {NextFunction,Response,Request} from "express";
import HttpStatus from "http-status";
import DefaultApiResponseEntity from "../entities/response/appDefault/DefaultApiResponseEntity";
import SuccessResponse from "../../core/response/SuccessResponse";


class AppDefaultController  {
    index(req:Request,res:Response,next:NextFunction){
        try{
            const responseBody = new DefaultApiResponseEntity(AppDefaultControllerKeys.index.version,AppDefaultControllerKeys.index.status);
            const response = new SuccessResponse<DefaultApiResponseEntity>(responseBody);
            res.status(HttpStatus.OK).json(response);
        }catch (e) {
            next(e);
        }
    }
}

export class AppDefaultControllerKeys{
    static index = {
        version: "1.0",
        status: "Api is running"
    }
}

export default new AppDefaultController();