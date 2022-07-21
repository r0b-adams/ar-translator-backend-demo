const { ImageAnnotatorClient } = require('@google-cloud/vision');
const keyFilename = require('../auth');

const viewer = new ImageAnnotatorClient({ keyFilename });

module.exports = viewer;
