import Joi from 'joi';
import { RequestHandler } from 'express';

import { translator } from '../../google_APIs/clients';
import ReqBody from '../../@types/requests';
import ResBody from '../../@types/responses';

/*
 * GET /translateAPI/languages
 */
export const getLanguages: RequestHandler<{}, {}, ResBody.Languages> = async (
  _req,
  res
) => {
  try {
    const [languages] = await translator.getLanguages();
    res.status(200).json(languages);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

/*
 * POST /translateAPI/translate
 */
export const postTranslate: RequestHandler<
  {},
  ResBody.Translation,
  ReqBody.Translate
> = async (req, res) => {
  try {
    const { text, from, to } = req.body;
    const [result] = await translator.translate(text, { from, to });
    res.status(200).json({ result });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
