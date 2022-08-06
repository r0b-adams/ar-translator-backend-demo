import { annotator, translator } from '../../google_apis/clients';
import { RequestHandler } from 'express';
import { google } from '@google-cloud/vision/build/protos/protos';

type LocalizeReqBody = {
  img: string;
  to: string;
};

type LocalizeResbody =
  | google.cloud.vision.v1.ILocalizedObjectAnnotation[]
  | (google.cloud.vision.v1.ILocalizedObjectAnnotation & {
      trgLangCode: string;
      translatedName: string;
    })[]
  | { message: string }
  | { error: unknown };

// TODO: validate req.body
// expect:
// img: string -> a string of b64 encoded data representing the image
//  to: string -> a BCP 47 language tag indicating the language of the voice
export const localizeAndTranslate: RequestHandler<
  {},
  LocalizeResbody,
  LocalizeReqBody
> = async (req, res) => {
  try {
    if (!req.userID) {
      res.status(401).json({ error: 'Please login' });
      return;
    }

    const { img, to } = req.body; // arrives as a string of encoded data of that looks like data:image/[jpeg|png];base64, [encodedASCIIstr]
    const [, b64encodedImage] = img.split(','); // ignore the prefixes and grab just the b64 str

    // TODO: validate b64 string
    // https://joi.dev/api/?v=17.6.0#stringbase64options

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
