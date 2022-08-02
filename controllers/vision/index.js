const { viewer, translator } = require('../../google_apis/clients');

const analyzeObjects = async (req, res) => {
  try {
    const { img } = req.body; // arrives as a string of encoded data of that looks like data:image/[jpeg|png];base64, [encodedASCIIstr]
    const [, b64encodedImage] = img.split(','); // ignore the prefixes and grab just the b64 str

    const request = {
      image: { content: b64encodedImage },
    };

    const [result] = await viewer.objectLocalization(request);
    const objects = result.localizedObjectAnnotations;

    res.status(200).json(objects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

const localizeObjectsAndTranslate = async (req, res) => {
  try {
    const { img, to } = req.body;
    const [, b64encodedImage] = img.split(',');

    const request = {
      image: { content: b64encodedImage },
    };

    const [result] = await viewer.objectLocalization(request);
    const objects = result.localizedObjectAnnotations;

    if (!objects.length) res.status(200).json({ message: 'no objects found' });
    const objNames = objects.map((obj) => obj.name);

    // call Google Translate *once* with an array of object names
    const [translations] = await translator.translate(objNames, {
      from: 'en',
      to,
    });

    // return objects array with source, target, and translation included
    const objsWithTranslations = objects.map((obj, idx) => {
      delete obj.languageCode; // this field is always empty
      return {
        ...obj,
        srcLangCode: from,
        trgLangCode: to,
        translatedName: translations[idx],
      };
    });

    res.status(200).json(objsWithTranslations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

module.exports = { analyzeObjects, localizeObjectsAndTranslate };
