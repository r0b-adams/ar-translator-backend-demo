import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import { RequestHandler } from 'express';

import User from '../../db/models';
import ReqBody from '../../@types/requests';
import ResBody from '../../@types/responses';
import { Constants } from '../../db/models/User/constants';
import { AuthError, QueryError, UniquenessError } from '../../helpers/errors';

const { SECRET_KEY } = process.env;
const TOKEN_OPTS = { expiresIn: '24h' };
const { MIN_LENGTH, PASSWORD_REGEX } = Constants;

/*
 * GET /auth/users
 */
export const getUser: RequestHandler<{}, ResBody.Auth> = async (req, res) => {
  try {
    // check authorization
    if (!req.userID) throw new AuthError('Please login');
    const user = await User.findOne({ _id: req.userID });
    if (!user) throw new QueryError('Error fetching user. Please login.');
    res.status(200).json({ user });
  } catch (error) {
    // no credentials
    if (error instanceof AuthError) {
      res.status(401).json({ error: error.message });

      // error with db
    } else if (error instanceof QueryError) {
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
    // validate request body
    const schema = Joi.object({
      username: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(MIN_LENGTH).pattern(PASSWORD_REGEX).required(),
    });
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) throw error;

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
    // Joi errors
    if (error instanceof Joi.ValidationError) {
      const details = error.details.map((detail) => detail.message);
      res.status(400).json({ errors: details });

      // username/email already exist
    } else if (error instanceof UniquenessError) {
      res.status(400).json({ error: error.message });

      // misc
    } else if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

/*
 * POST /auth/login
 */
export const login: RequestHandler<{}, ResBody.Auth, ReqBody.Login> = async (
  req,
  res
) => {
  try {
    // validate request body
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().min(MIN_LENGTH).pattern(PASSWORD_REGEX).required(),
    });
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) throw error;

    // verify username
    const user = await User.findOne({ username: req.body.username });
    if (!user) throw new AuthError('Wrong username and/or password');

    // verify found user password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) throw new AuthError('Wrong username and/or password');

    // create token and send response
    const token = jwt.sign({ userID: user.id }, SECRET_KEY!, TOKEN_OPTS);
    res.status(200).json({ token, user });
  } catch (error) {
    // Joi errors
    if (error instanceof Joi.ValidationError) {
      const details = error.details.map((detail) => detail.message);
      res.status(400).json({ errors: details });

      // bad credentials
    } else if (error instanceof AuthError) {
      res.status(401).json({ error: error.message });

      // misc
    } else if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

/*
 * DELETE /auth/logout
 */
export const logout: RequestHandler = async (req, res) => {
  req.userID ? res.sendStatus(204) : res.sendStatus(403);
};
