import { RequestHandler } from 'express';
import { Types } from 'mongoose';

import { User, UserDoc } from '../db/models/User';
import { UniquenessError } from '../helpers/errors';

const checkUniqueness: RequestHandler = async (req, _res, next) => {
  try {
    let user:
      | (UserDoc & {
          _id: Types.ObjectId;
        })
      | null;

    user = await User.findOne({ username: req.body.username });
    if (user) throw new UniquenessError('that username already exists');

    user = await User.findOne({ email: req.body.email });
    if (user) throw new UniquenessError('user with that email already exists');

    next();
  } catch (err) {
    next(err);
  }
};

export default checkUniqueness;
