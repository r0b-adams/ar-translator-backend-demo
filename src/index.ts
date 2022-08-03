import express from 'express';
import routes from './routes';
import { authenticate, catchAll404 } from './middleware';

const PORT = process.env.PORT || 3000;
const app = express();

const FILE_UPLOAD_LIMIT = '100mb';

app.use(
  express.urlencoded({
    limit: FILE_UPLOAD_LIMIT,
    extended: false,
  })
);
app.use(express.json({ limit: FILE_UPLOAD_LIMIT }));
app.use(express.static('src/client'));
app.use(authenticate);
app.use(routes);
app.use(catchAll404);
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
