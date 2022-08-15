import { RequestHandler } from 'express';

import User from '../db/models/User';
import { UniquenessError } from '../helpers/errors';

const checkUniqueness: RequestHandler = async (req, _res, next) => {
  try {
    const { username, email } = req.body;

    const user_un = await User.findOne({ 'profile.username': username });
    if (user_un) {
      throw new UniquenessError('an account with that username already exists');
    }

    const user_em = await User.findOne({ 'profile.email': email });
    if (user_em) {
      throw new UniquenessError('an account with that email already exists');
    }

    next();
  } catch (err) {
    next(err);
  }
};

export default checkUniqueness;
