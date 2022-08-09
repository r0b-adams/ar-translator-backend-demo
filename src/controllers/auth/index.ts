import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../../db/models';

// types
import { RequestHandler } from 'express';
import ReqBody from '../../@types/requests';
import ResBody from '../../@types/responses';

const { SECRET_KEY } = process.env;
const TOKEN_OPTS = { expiresIn: '24h' };

/*
 * GET /auth/users
 */
export const getUser: RequestHandler<{}, ResBody.Auth> = async (req, res) => {
  try {
    if (!req.userID) {
      res.status(401).json({ error: 'Please login' });
      return;
    }
    const user = await User.findById(req.userID);
    if (!user) throw new Error();
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching user' });
  }
};

/**
 * POST /auth/register
 */
export const register: RequestHandler<{}, ResBody.Auth, ReqBody.Auth> = async (
  req,
  res
) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      res.status(401).json({ error: 'User already exists' });
    } else {
      user = await User.create(req.body);
      const token = jwt.sign({ userID: user.id }, SECRET_KEY!, TOKEN_OPTS);
      res.status(201).json({ token, user });
    }
  } catch (error) {
    console.error(error);
  }
};

/*
 * POST /auth/login
 */
export const login: RequestHandler<{}, ResBody.Auth, ReqBody.Auth> = async (
  req,
  res
) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      res.status(401).json({ error: 'Wrong username and/or password' });
    } else {
      const token = jwt.sign({ userID: user.id }, SECRET_KEY!, TOKEN_OPTS);
      res.status(200).json({ token, user });
    }
  } catch (error) {
    console.error(error);
  }
};

/*
 * DELETE /auth/logout
 */
export const logout: RequestHandler = async (req, res) => {
  req.userID ? res.sendStatus(204) : res.sendStatus(403);
};
