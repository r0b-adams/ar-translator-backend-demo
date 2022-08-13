import { ValidationError } from 'Joi';
import { ErrorRequestHandler } from 'express';

import { AuthError, UniquenessError } from '../helpers/errors';

export const validationErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  next
) => {
  // Joi errors returning correct properites, but are being
  // thrown as the basic Error instance instead of ValidationError
  // check for both just in case
  const isJoiError =
    err.name === 'ValidationError' &&
    'details' in err &&
    Array.isArray(err.details);

  if (err instanceof ValidationError || isJoiError) {
    const { details } = err as ValidationError;
    const errors = details.map((detail) => detail.message);
    res.status(400).json({ errors });
  } else {
    next();
  }
};

export const otherErrorHandler: ErrorRequestHandler = (
  err,
  _req,
  res,
  _next
) => {
  if (err instanceof AuthError) {
    res.status(401).json({ error: err.message });
    return;
  }

  if (err instanceof UniquenessError) {
    res.status(400).json({ error: err.message });
    return;
  }

  // catch all
  if (err instanceof Error) {
    console.log(err.name);
    console.log(err.stack);
    res.status(500).json({ message: err.message });
    return;
  }
};
