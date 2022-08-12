import { RequestHandler } from 'express';

import { translator } from '../../google_APIs/clients';

/*
 * GET /translateAPI/languages
 */
export const getLanguages: RequestHandler = async (_req, res, next) => {
  try {
    const [languages] = await translator.getLanguages();
    res.status(200).json(languages);
  } catch (err) {
    next(err);
  }
};

/*
 * POST /translateAPI/translate
 */
export const postTranslate: RequestHandler = async (req, res, next) => {
  try {
    const { text, from, to } = req.body;

    const [result] = await translator.translate(text, { from, to });
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};
