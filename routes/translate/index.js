const router = require('express').Router();
const translateRoutes = require('./translate-routes');

router.use('/translateAPI', translateRoutes);

module.exports = router;
