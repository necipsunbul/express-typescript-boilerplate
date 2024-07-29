import ResponseManager from "./ResponseManager";
import AppError from "../error/AppError";

export default class EventResponse<T> extends ResponseManager{
    error?:AppError;
    payload?:T;
    constructor(body: EventResponseBody<T>) {
        super(body.error?.message || "")
        this.error = body.error;
        this.payload = body.payload;
    }
    toJSON() {
        if(this.error){
            return Object.assign({},{data: {error:this.error}});
        }
        return Object.assign({},{data: {payload:this.payload}});
    }
}

export interface EventResponseBody<T>{
    error?: AppError;
    payload?: T;
}