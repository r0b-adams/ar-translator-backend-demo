const router = require('express').Router();
const { postTranslate, getLanguages } = require('../../controllers/translate');

router.get('/languages', getLanguages);
router.post('/translate', postTranslate);

module.exports = router;
