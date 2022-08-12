import { ValidationError } from 'Joi';
import { ErrorRequestHandler } from 'express';

import { AuthError, UniquenessError } from '../helpers/errors';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ValidationError) {
    const details = err.details.map((detail) => detail.message);
    res.status(400).json({ errors: details });
    return;
  }

  if (err instanceof AuthError) {
    res.status(401).json({ error: err.message });
    return;
  }

  if (err instanceof UniquenessError) {
    res.status(400).json({ error: err.message });
    return;
  }

  if (err instanceof Error) {
    res.status(500).json({ message: err.message });
    return;
  }
};

export default errorHandler;
