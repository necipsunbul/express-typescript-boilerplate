import BaseEntityModel from "../../../core/base/BaseEntityModel";

export interface IAuditEntityBody{
    createdAt?: Date;
    createdBy?: String;
    updatedAt?: Date;
    updatedBy?: String;
}

export default class AuditEntityModel extends BaseEntityModel{
    createdAt?: Date;
    createdBy?: String;
    updatedAt?: Date;
    updatedBy?: String;
    constructor(body:IAuditEntityBody) {
        super();
        this.createdAt = body.createdAt;
        this.createdBy = body.createdBy;
        this.updatedAt = body.updatedAt;
        this.updatedBy = body.updatedBy;
    }
}