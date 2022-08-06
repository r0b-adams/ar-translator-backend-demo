import { translator } from '../../google_apis/clients';
import { RequestHandler } from 'express';
import { LanguageResult } from '@google-cloud/translate/build/src/v2';

type LanguagesResBody = { languages: LanguageResult[] } | { error: unknown };

export const getLanguages: RequestHandler<{}, {}, LanguagesResBody> = async (
  req,
  res
) => {
  console.log('GET /translateAPI/languages');
  try {
    if (!req.userID) {
      res.status(401).json({ error: 'Please login' });
      return;
    }
    const [languages] = await translator.getLanguages();
    res.status(200).json({ languages });
  } catch (error) {
    res.status(500).json({ error });
  }
};

type TranslateReqBody = {
  text: string;
  from: string;
  to: string;
};

type TranslateResBody = { result: string } | { error: unknown };

export const postTranslate: RequestHandler<
  {},
  TranslateResBody,
  TranslateReqBody
> = async (req, res) => {
  try {
    if (!req.userID) {
      res.status(401).json({ error: 'Please login' });
      return;
    }
    const { text, from, to } = req.body;
    const [result] = await translator.translate(text, { from, to });
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error });
  }
};
