// @ts-ignore
import HttpStatus from 'http-status';
import { Request, Response, NextFunction } from 'express';
import { ObjectSchema, ValidationOptions } from 'joi';
import ErrorResponse from '../../core/response/ErrorResponse';
import { joiValidationOptions } from '../../core/config/JoiConfigs';

export default (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { value, error } = schema.validate(req.body, joiValidationOptions);
  if (error) {
    const errorMessage = error.details?.map((detail) => detail.message).join(',');
    return res.status(HttpStatus.BAD_REQUEST).json(new ErrorResponse(errorMessage));
  }
  Object.assign(req.body, value);
  return next();
};
