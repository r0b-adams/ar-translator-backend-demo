import 'dotenv/config';
import express from 'express';
import db from './db';
import router from './routes';
import { authenticate, _404 } from './middleware';

const PORT = process.env.PORT || 3000;
const app = express();

const FILE_UPLOAD_LIMIT = '100mb';

(async () => {
  await db.connect();
  app.use(express.json({ limit: FILE_UPLOAD_LIMIT }));
  app.use(express.urlencoded({ limit: FILE_UPLOAD_LIMIT, extended: false }));
  app.use(authenticate);
  app.use(router);
  app.use(_404);
  app.listen(PORT, () => console.log(`server listening on ${PORT}`));
})();
