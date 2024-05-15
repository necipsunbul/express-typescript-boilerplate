import ResponseManager from "./ResponseManager";
import {ResponseMessages} from "../contants/SystemContants";

export default class SuccessResponse<T> extends ResponseManager {
    body?: T | null;
    constructor(data?: T) {
        super(ResponseMessages.defaultSuccessMessage);
        this.success = true;
        this.body = data;
    }

    toJson() {
        if(!this.body) return super.toJson();
        return Object.assign({},{...this,body:{...this.body}});
    }
}