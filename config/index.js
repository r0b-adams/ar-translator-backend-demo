// import Google Cloud client
const { Translate } = require('@google-cloud/translate').v2;

// instantiate Translate class
const translator = new Translate({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  key: process.env.GOOGLE_CLOUD_PROJECT_KEY,
});

module.exports = translator;
