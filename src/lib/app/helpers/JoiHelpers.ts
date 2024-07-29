import {ObjectSchema} from "joi";
import {joiValidationOptions} from "../../core/config/JoiConfigs";


export const joiValidator = (schema: ObjectSchema, body: object) => {
    const { error } = schema.validate(JSON.parse(JSON.stringify(body)), joiValidationOptions);
    if (error) return error.details?.map((detail) => detail.message).join(",");
    return null;
};