import { RequestHandler } from 'express';

import reqBodySchema from '../validation/reqBodySchema';

/**
 * verify shape of request body
 */
const validateReqBody: RequestHandler = async (req, _res, next) => {
  try {
    const { method, originalUrl, body } = req;

    // lookup schema by method and path (e.g. POST/auth/register)
    const path = method + originalUrl;
    await reqBodySchema(path).validateAsync(body, {
      abortEarly: false,
    });

    next();
  } catch (err) {
    next(err);
  }
};

export default validateReqBody;
