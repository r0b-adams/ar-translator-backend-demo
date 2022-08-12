import { RequestHandler } from 'express';

import { validateRequestBody } from '../validation';

/**
 * verify shape of request body
 */
const validate: RequestHandler = async (req, _res, next) => {
  try {
    await validateRequestBody(req);
    next();
  } catch (error) {
    next(error);
  }
};

export default validate;
