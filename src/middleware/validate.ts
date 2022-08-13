import { RequestHandler } from 'express';

import reqbodySchema from '../validation/reqbodySchema';

/**
 * verify shape of request body
 */
const validate: RequestHandler = (req, _res, next) => {
  try {
    const { method, originalUrl, body } = req;

    // lookup schema by method and path
    // (e.g. POST/auth/register)
    const type = method + originalUrl;
    const { error } = reqbodySchema(type).validate(body, {
      abortEarly: false, // collect all errors
    });
    if (error) throw error;

    next();
  } catch (err) {
    next(err);
  }
};

export default validate;
