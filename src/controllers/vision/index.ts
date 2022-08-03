import { annotator, translator } from '../../google_apis/clients';
import { RequestHandler } from 'express';

export const localize: RequestHandler = async (req, res) => {
  try {
    const { img } = req.body; // arrives as a string of encoded data of that looks like data:image/[jpeg|png];base64, [encodedASCIIstr]
    const [, b64encodedImage] = img.split(','); // ignore the prefixes and grab just the b64 str

    const request = {
      image: { source: b64encodedImage },
    };

    const [result] = await annotator.objectLocalization!(request);
    const objects = result.localizedObjectAnnotations;

    res.status(200).json(objects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const localizeAndTranslate: RequestHandler = async (req, res) => {
  try {
    const { img, to } = req.body;
    const [, b64encodedImage] = img.split(',');

    const request = {
      image: { content: b64encodedImage },
    };

    const [result] = await annotator.objectLocalization!(request);
    const objects = result.localizedObjectAnnotations;

    if (!objects || !objects.length) {
      return res.status(200).json({ message: 'no objects found' });
    }

    // call Google Translate *once* with an array of object names
    const objNames = objects.map((obj) => obj.name!);
    const [translations] = await translator.translate(objNames, {
      from: 'en',
      to,
    });

    // return objects array with target lang and translation included
    const objsWithTranslations = objects.map((obj, idx) => {
      delete obj.languageCode; // this field is always empty
      return {
        ...obj,
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
