import jwt, { JwtPayload } from 'jsonwebtoken';
import { RequestHandler } from 'express';

const { SECRET_KEY } = process.env;

// intercept the req object before reaching any endpoints
// if there is a valid token, assign it to a req object property
const authenticate: RequestHandler = (req, _res, next) => {
  const bearer = req.headers.authorization;
  const token = bearer?.split(' ')[1];
  if (token) {
    jwt.verify(token, SECRET_KEY!, (err, decoded) => {
      if (!err) {
        req.userID = (decoded as JwtPayload).userID;
      }
    });
  }
  next();
};

export default authenticate;
