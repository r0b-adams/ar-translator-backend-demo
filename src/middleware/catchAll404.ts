import { RequestHandler } from 'express';

const catchAll404: RequestHandler = (_, res) => {
  return res.status(404).send("Sorry can't find that!");
};

export default catchAll404