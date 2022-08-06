import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../../db/models';
import { RequestHandler } from 'express';
import { Types } from 'mongoose';

const { SECRET_KEY } = process.env;

const TOKEN_OPTS = {
  expiresIn: '24h',
};

type userResBody =
  | {
      user: User & {
        _id: Types.ObjectId;
      };
    }
  | { error: unknown };

export const getUser: RequestHandler<{}, userResBody> = async (req, res) => {
  try {
    if (!req.userID) {
      res.status(401).json({ error: 'Please login' });
      return;
    }

    const user = await User.findById(req.userID);
    if (!user) throw new Error('Error fetching user');
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

// TODO: add validation to req.body
// expect:
// username: string -> min:8, max:32, alphanumeric,
// password: string -> min:12, max:64, alphanumeric, ! @ # $ % & ?
// email: string -> <name>@<domain>
type RegisterReqBody = {
  email: string;
  username: string;
  password: string;
};

type RegisterResBody =
  | {
      token: string;
      user: User & {
        _id: Types.ObjectId;
      };
    }
  | { error: string };

// TODO: add validation to req.body
// username and email should be unique
// expect:
// email: string
// username: string
// password: string
export const register: RequestHandler<
  {},
  RegisterResBody,
  RegisterReqBody
> = async (req, res) => {
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

// TODO: add validation to req.body
// expect:
// username: string
// email: string
type LoginReqBody = {
  username: string;
  password: string;
};

type LoginResBody =
  | {
      token: string;
      user: User & {
        _id: Types.ObjectId;
      };
    }
  | { error: string };

export const login: RequestHandler<{}, LoginResBody, LoginReqBody> = async (
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

export const logout: RequestHandler = async (req, res) => {
  req.userID ? res.sendStatus(204) : res.sendStatus(403);
};
