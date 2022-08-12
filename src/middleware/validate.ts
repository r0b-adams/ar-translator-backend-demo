import { RequestHandler } from 'express';
import { ValidationError } from 'Joi';

import RequestBodySchema from '../validation';

/**
 * verify shape of request body
 */
const validate: RequestHandler = (req, _res, next) => {
  try {
    const { method, originalUrl, body } = req;

    // lookup schema by method and endpoint
    // (e.g. POST/auth/register)
    const reqTypeKey = method + originalUrl;
    const schema = RequestBodySchema[reqTypeKey];

    const { error } = schema.validate(body, {
      abortEarly: false, // collect all errors
    });

    // coerce error to a ValidationError instance
    if (error) {
      throw new ValidationError(error.message, error.details, error._original);
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default validate;
