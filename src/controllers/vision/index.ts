import { RequestHandler } from 'express';
import Joi from 'joi';

import { annotator, translator } from '../../google_APIs/clients';
import ReqBody from '../../@types/requests';
import ResBody from '../../@types/responses';

export const localizeAndTranslate: RequestHandler<
  {},
  ResBody.Vision,
  ReqBody.Vision
> = async (req, res) => {
  try {
    // grab target language and encoded data
    const { img, to } = req.body; // img arrives as a string of b64 encoded data
    const [, b64encodedImage] = img.split(','); // ignore the MIME type and grab the b64 substr

    // validate encoded img data
    const { error } = Joi.string().base64().validate(b64encodedImage);
    if (error) throw error;

    // query Google Vision API
    const [result] = await annotator.objectLocalization!({
      image: { content: b64encodedImage },
    });
    const objects = result.localizedObjectAnnotations;

    // no objects recognized
    if (!objects || !objects.length) {
      res.status(204).json({ message: 'no objects found' });
      return;
    }

    // Google Vision only returns English results
    // if that is the target, just return data
    if (to === 'en') {
      res.status(200).json(objects);
      return;
    }

    // query Google Translate API once with array of obj descriptions
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
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
