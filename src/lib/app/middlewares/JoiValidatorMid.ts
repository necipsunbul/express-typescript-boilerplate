// @ts-ignore
import HttpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import { ObjectSchema, ValidationOptions } from "joi";
import AppError from "../../core/error/AppError";

const options: ValidationOptions = {
    errors: {
        wrap: { label: false },
    },
};

export default (schema: ObjectSchema) =>
    (req: Request, res: Response, next: NextFunction) => {
        const { value, error } = schema.validate(req.body, options);
        if (error) {
            const errorMessage = error.details
                ?.map((detail) => detail.message)
                .join(",");
            return res
                .status(HttpStatus.BAD_REQUEST)
                .json(new AppError(errorMessage));
        }
        Object.assign(req, value);
        return next();
    };