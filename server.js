const express = require('express');
const routes = require('./routes');

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

// UI files (by default, looks for 'index.html')
// https://expressjs.com/en/4x/api.html#express.static
// handles the '/' root lvl endpoint
app.use(express.static('client'));

app.use(routes);

// catch all for unrecognized endpoints
app.get('*', (_req, res) => {
  res.status(404).json({ error: 'not found' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
