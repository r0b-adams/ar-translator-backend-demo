import 'dotenv/config';
import express from 'express';

import db from './db';
import router from './routes';
import {
  authenticate,
  otherErrorHandler,
  validationErrorHandler,
  respond404,
} from './middleware';
import { FILE_UPLOAD_LIMIT } from './helpers/constants';

const PORT = process.env.PORT || 3000;
const app = express();

(async () => {
  await db.connect();
  app.use(express.json({ limit: FILE_UPLOAD_LIMIT }));
  app.use(express.urlencoded({ limit: FILE_UPLOAD_LIMIT, extended: false }));
  app.use(authenticate);
  app.use(router);
  app.use(respond404);
  app.use(validationErrorHandler);
  app.use(otherErrorHandler);
  app.listen(PORT, () => console.log(`server listening on ${PORT}`));
})();
