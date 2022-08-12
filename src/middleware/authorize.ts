import { RequestHandler } from 'express';
import { AuthError } from '../helpers/errors';

/**
 * check for presence of the userID property added by authenticate middleware
 */
const authorize: RequestHandler = (req, _res, next) => {
  req.userID ? next() : next(new AuthError('Please login'));
};

export default authorize;
