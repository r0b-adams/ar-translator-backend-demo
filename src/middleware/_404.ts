import { RequestHandler } from 'express';

const _404: RequestHandler = (_, res) => {
  res.status(404).send({ message: "Sorry can't find that!" });
};

export default _404;
