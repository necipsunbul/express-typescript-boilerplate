import BaseEntityModel from "../../../core/base/BaseEntityModel";
import AuditEntityModel from "../database/AuditEntityModel";

export class UserEntityModel extends BaseEntityModel{
    name?: string;
    surName?: string;
    email?: string;
    userName?: string;
    password?: string;
    audit?: AuditEntityModel;
    roles?: number[];
}