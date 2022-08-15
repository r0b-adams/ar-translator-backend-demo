import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';

import { AuthError } from '../../helpers/errors';
import { User } from '../../db/models';

const TOKEN_OPTS = { expiresIn: '24h' };
const { SECRET_KEY } = process.env;

/**
 * GET /auth/users
 */
export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(req.userID);

    // valid token found but decoded ID not associated with an existing user
    // possible if client retains token locally after Doc deletion
    if (!user) throw new AuthError('Error fetching user. Please login.');

    res.status(200).json({ profile: user.profile });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /auth/register
 */
export const register: RequestHandler = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.create({
      profile: {
        username,
        email,
      },
      credentials: {
        password,
      },
    });

    const token = jwt.sign({ userID: user.id }, SECRET_KEY!, TOKEN_OPTS);

    res.status(201).json({ token, profile: user.profile });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /auth/login
 */
export const login: RequestHandler = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findByUsername(username);
    if (!user) throw new AuthError('Wrong username and/or password');

    const validPassword = await bcrypt.compare(
      password,
      user.credentials.password
    );
    if (!validPassword) throw new AuthError('Wrong username and/or password');

    const token = jwt.sign({ userID: user.id }, SECRET_KEY!, TOKEN_OPTS);

    res.status(200).json({ token, profile: user.profile });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /auth/logout
 */
export const logout: RequestHandler = (req, res) => {
  delete req.userID;
  res.send(204).json({ message: 'logged out successfully!' });
};
