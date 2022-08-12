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
    const user = await User.findOne({ _id: req.userID });

    // had a valid token but decoded ID not associated with an existing user
    if (!user) throw new Error('Error fetching user. Please login.');

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
    const user = await User.create(req.body);
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
    const user = await User.findOne({ username: req.body.username });
    if (!user) throw new AuthError('Wrong username and/or password');

    const validPass = await bcrypt.compare(req.body.password, user.password);
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
  res.send(204).json('logged out successfully!');
};
