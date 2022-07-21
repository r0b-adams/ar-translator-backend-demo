const { postTranslate, getLanguages } = require('../controllers');
const router = require('express').Router();

router.post('/translate', postTranslate);

router.get('/languages', getLanguages);

module.exports = router;
