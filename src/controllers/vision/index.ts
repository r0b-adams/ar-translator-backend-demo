import { annotator, translator } from '../../google_apis/clients';
import Joi from 'joi';
import { RequestHandler } from 'express';
import ReqBody from '../../@types/requests';
import ResBody from '../../@types/responses';

// TODO: validate req.body
// expect:
// img: string -> a string of b64 encoded data representing the image
//  to: string -> a BCP 47 language tag indicating the language of the voice
export const localizeAndTranslate: RequestHandler<
  {},
  ResBody.Vision,
  ReqBody.Vision
> = async (req, res) => {
  try {
    if (!req.userID) {
      res.status(401).json({ error: 'Please login' });
      return;
    }

    // TODO: validate dataURI
    // https://joi.dev/api/?v=17.6.0#stringdataurioptions
    // data:image/[jpeg|png];base64, <encodedASCIIstr>
    const { img, to } = req.body; // img arrives as a string of b64 encoded data
    const [, b64encodedImage] = img.split(','); // ignore the prefixes and grab just the b64 str

    // TESTING VALIDATION SCHEMA
    const body = Joi.object({
      img: Joi.string().dataUri(),
      to: Joi.string().max(2),
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////

    // TODO: validate b64 string
    // https://joi.dev/api/?v=17.6.0#stringbase64options

    const b64 = Joi.string().base64();
    const request = {
      image: { content: b64encodedImage },
    };

    const [result] = await annotator.objectLocalization!(request);
    const objects = result.localizedObjectAnnotations;

    // no objects recognized
    if (!objects || !objects.length) {
      res.status(200).json({ message: 'no objects found' });
      return;
    }

    // Google Vision only returns results in English
    // if that is the target, just return data
    if (to === 'en') {
      res.status(200).json(objects);
      return;
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
