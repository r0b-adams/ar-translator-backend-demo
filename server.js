require('dotenv').config();

const express = require('express');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // UI files
app.use(routes);

// catch all error
app.get('*', (_req, res) => res.status(404).json({ error: 'not found' }));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
