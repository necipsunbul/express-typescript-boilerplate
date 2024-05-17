import BaseDbService from "./BaseDbService";
import BaseEntityModel from "./BaseEntityModel";
export default abstract class BaseService{
    protected abstract repo: BaseDbService;
    protected errorServiceCallback<T>(error?:Error,data?: T){
        return new ServiceResponseEntity<T>({
            success:false,
            error: error,
            data:data,
            message: error?.message
        });
    }
    protected successServiceCallback<T>(data?:T){
        return new ServiceResponseEntity<T>({
            success:true,
            data:data
        });
    }
}

export class ServiceResponseEntity<T> extends BaseEntityModel{
    message?:string;
    success?:boolean;
    error? : Error;
    data?:  T;
    constructor( body: IServiceResponseEntityBody<T> ) {
        super();
        this.message = body.message;
        this.success = body.success;
        this.data = body.data;
        this.error = body.error;
    }
}


export interface IServiceResponseEntityBody<T>{
    error? : Error
    message?:string;
    success?:boolean;
    data?:  T;
}