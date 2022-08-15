import { RequestHandler } from 'express';

const respond404: RequestHandler = (_, res) => {
  res.status(404).send({ message: "Sorry can't find that!" });
};

export default respond404;
