const router = require('express').Router();

const translateAPI = require('./translate');
const visionAPI = require('./vision');

router.use(translateAPI);
router.use(visionAPI);

module.exports = router;
