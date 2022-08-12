import { Request } from 'express';

import { RequestBodySchema } from './schema';

const validateRequestBody = async (req: Request): Promise<void> => {
  const { method, originalUrl, body } = req;

  // lookup schema by method and endpoint
  // (e.g. POST/auth/register)
  const reqTypeKey = method + originalUrl;
  const schema = RequestBodySchema[reqTypeKey];

  const { error } = await schema.validateAsync(body, {
    abortEarly: false,
  });
  if (error) throw error;
};

export { validateRequestBody };
