import { ValidationError } from 'joi';
import { ErrorRequestHandler } from 'express';

import { AuthError, UniquenessError } from '../helpers/errors';

/**
 * Joi validation can return err array of multiple failed checks
 *
 * Catch and return list of the err messages
 */
export const validationErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  next
) => {
  // Joi errors include correct properites, but are being
  // thrown as a basic Error instance instead of ValidationError
  // check for both just in case
  const isJoiError =
    err.name === 'ValidationError' &&
    'details' in err &&
    Array.isArray(err.details);

  if (err instanceof ValidationError || isJoiError) {
    const { details } = err as ValidationError;
    const error = details.map((detail) => detail.message);
    res.status(400).json({ error });
  } else {
    next(err);
  }
};

export const otherErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next
) => {
  // bad credentials
  if (err instanceof AuthError) {
    res.status(401).json({ error: err.message });
    return;
  }

  // username or email already exist in db
  if (err instanceof UniquenessError) {
    res.status(400).json({ error: err.message });
    return;
  }

  // catch all
  if (err instanceof Error) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
};
