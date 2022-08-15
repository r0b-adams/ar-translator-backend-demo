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

    res.status(200).json({ user });
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

    res.status(201).json({ token, user });
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

    const user = await User.findOne({ 'profile.username': username });
    if (!user) throw new AuthError('Wrong username and/or password');

    const validPass = await bcrypt.compare(password, user.credentials.password);
    if (!validPass) throw new AuthError('Wrong username and/or password');

    const token = jwt.sign({ userID: user.id }, SECRET_KEY!, TOKEN_OPTS);

    res.status(200).json({ token, user });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /auth/logout
 */
export const logout: RequestHandler = (_req, res) => {
  res.send(204).json({ message: 'logged out successfully!' });
};
