import { ValidationError } from 'Joi';
import { ErrorRequestHandler } from 'express';

import { AuthError, UniquenessError } from '../helpers/errors';

const errorHandler: ErrorRequestHandler = (err, _req, res) => {
  // unauthorized / unauthenticated
  if (err instanceof AuthError) {
    res.status(401).json({ error: err.message });
    return;
  }

  // username / password exists (registration)
  if (err instanceof UniquenessError) {
    res.status(400).json({ error: err.message });
    return;
  }

  // schema doesn't match
  if (err instanceof ValidationError) {
    const details = err.details.map((detail) => detail.message);
    res.status(400).json({ errors: details });
    return;
  }

  // other errors
  if (err instanceof Error) {
    res.status(500).json({ error: err.message });
    return;
  }
};

export default errorHandler;
