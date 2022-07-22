const router = require('express').Router();
const { analyzeObjects } = require('../../controllers/vision');

router.post('/objects', analyzeObjects);

module.exports = router;
