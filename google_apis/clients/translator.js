const { v2: { Translate } } = require('@google-cloud/translate');
const keyFilename = require('../auth');

const translator = new Translate({ keyFilename });

module.exports = translator;
