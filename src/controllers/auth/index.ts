import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { RequestHandler } from 'express';

import User from '../../db/models';
import { AuthError, QueryError, UniquenessError } from '../../helpers/errors';
import ReqBody from '../../@types/requests';
import ResBody from '../../@types/responses';

const TOKEN_OPTS = { expiresIn: '24h' };
const { SECRET_KEY } = process.env;

/**
 * GET /auth/users
 */
export const getUser: RequestHandler<{}, ResBody.Auth> = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.userID });
    if (!user) throw new QueryError('Error fetching user. Please login.');
    res.status(200).json({ user });
  } catch (error) {
    // auth token valid, but userID not associated with a document
    if (error instanceof QueryError) {
      res.status(500).json({ error: error.message });
      // misc
    } else if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

/**
 * POST /auth/register
 */
export const register: RequestHandler<
  {},
  ResBody.Auth,
  ReqBody.Register
> = async (req, res) => {
  try {
    // check username and email uniqueness
    let user;
    user = await User.findOne({ username: req.body.username });
    if (user) throw new UniquenessError('that username already exists');
    user = await User.findOne({ email: req.body.email });
    if (user) throw new UniquenessError('user with that email already exists');

    // create user, token, and send response
    user = await User.create(req.body);
    const token = jwt.sign({ userID: user.id }, SECRET_KEY!, TOKEN_OPTS);
    res.status(201).json({ token, user });
  } catch (error) {
    // username / password exists
    if (error instanceof UniquenessError) {
      res.status(400).json({ error: error.message });
      // misc
    } else if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

/**
 * POST /auth/login
 */
export const login: RequestHandler<{}, ResBody.Auth, ReqBody.Login> = async (
  req,
  res
) => {
  try {
    // verify username and password
    const user = await User.findOne({ username: req.body.username });
    if (!user) throw new AuthError('Wrong username and/or password');
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) throw new AuthError('Wrong username and/or password');

    // create token and send response
    const token = jwt.sign({ userID: user.id }, SECRET_KEY!, TOKEN_OPTS);
    res.status(200).json({ token, user });
  } catch (error) {
    // bad credentials
    if (error instanceof AuthError) {
      res.status(401).json({ error: error.message });
      //misc
    } else if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

/**
 * DELETE /auth/logout
 */
export const logout: RequestHandler = async (_req, res) => {
  res.send(204).json('logged out successfully!');
};
