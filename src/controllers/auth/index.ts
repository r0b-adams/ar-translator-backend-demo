import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../../db/models';
import { RequestHandler } from 'express';

const { SECRET_KEY } = process.env;
const TOKEN_OPTS = { expiresIn: '24h' };

export const getUser: RequestHandler = async (req, res) => {
  try {
    if (!req.userID) return res.status(401).json({ error: 'Please login' });

    const user = await User.findById(req.userID);

    if (!user) throw new Error('Error fetching user');
    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const register: RequestHandler = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password || !req.body.email) {
      return res.status(400).json({ error: 'Username, password, and email required' });
    }
    if (req.body.password.length < 8) {
      return res.status(400).json({ error: 'Password too short' });
    }

    let user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(401).json({ error: 'User already exists' });
    }

    user = await User.create(req.body);

const token = jwt.sign({ userID: user.id }, SECRET_KEY!, TOKEN_OPTS);
    return res.status(201).json({ token, user });
  } catch (error) {
    console.error(error);
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json({ error: 'Wrong username and/or password' });
    } else if (!(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ error: 'Wrong username and/or password' });
    } else {
      const token = jwt.sign({ userID: user.id }, SECRET_KEY!, TOKEN_OPTS);
      return res.status(200).json({ token, user });
    }
  } catch (error) {
    console.error(error);
  }
};

export const logout: RequestHandler = async (req, res) => {
  return req.userID ? res.sendStatus(204) : res.sendStatus(403);
};
