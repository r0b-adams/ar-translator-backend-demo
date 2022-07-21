const router = require('express').Router();
const visionRoutes = require('./vision-routes');

router.use('/visionAPI', visionRoutes);

module.exports = router;
