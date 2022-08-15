import { Router } from 'express';
import Joi from 'joi';

import { annotator, translator } from '../../google_APIs/clients';
import { authorize, validateReqBody } from '../../middleware';
import { LANGCODE_ENGLISH } from '../../helpers/constants';

const router = Router();

router.post('/objects', authorize, validateReqBody, async (req, res, next) => {
  try {
    // grab target language and encoded data
    const { img, to } = req.body; // img arrives as a string of b64 encoded data
    const [, b64encodedImage] = img.split(','); // ignore the MIME type and grab the b64 substr

    // validate encoded img data
    await Joi.string().base64().validateAsync(b64encodedImage);

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
    if (to === LANGCODE_ENGLISH) {
      res.status(200).json(objects);
      return;
    }

    // query Google Translate API once with array of obj descriptions
    const objNames = objects.map((obj) => obj.name!);
    const [translations] = await translator.translate(objNames, {
      from: LANGCODE_ENGLISH,
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
  } catch (err) {
    next(err);
  }
});

export default router;
