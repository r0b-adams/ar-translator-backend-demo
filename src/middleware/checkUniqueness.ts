import { RequestHandler } from 'express';

import User from '../db/models/User';
import { UniquenessError } from '../helpers/errors';

/**
 * verify username and password not taken
 */
const checkUniqueness: RequestHandler = async (req, _res, next) => {
  try {
    const { username, email } = req.body;

    const usernameExists = await User.findByUsername(username);
    if (usernameExists) {
      throw new UniquenessError(`username ${username} not available`);
    }

    const emailExists = await User.findByEmail(email);
    if (emailExists) {
      throw new UniquenessError('an account with that email already exists');
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default checkUniqueness;
