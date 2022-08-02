const router = require('express').Router();
const { localizeObjectsAndTranslate } = require('../../controllers/vision');

router.post('/objects', localizeObjectsAndTranslate);

module.exports = router;
