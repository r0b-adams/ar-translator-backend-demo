import { translator } from '../../google_apis/clients';
import { RequestHandler } from 'express';
import ReqBody from '../../@types/requests';
import ResBody from '../../@types/responses';
import Joi from 'joi';

/*
 * GET /translateAPI/languages
 */
export const getLanguages: RequestHandler<{}, {}, ResBody.Languages> = async (
  req,
  res
) => {
  try {
    if (!req.userID) {
      res.status(401).json({ error: 'Please login' });
      return;
    }
    const [languages] = await translator.getLanguages();
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ error });
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
    if (!req.userID) {
      res.status(401).json({ error: 'Please login' });
      return;
    }
    const { text, from, to } = req.body;

    const body = Joi.object({
      text: Joi.string(),
      from: Joi.string(),
      to: Joi.string()
    })


    const [result] = await translator.translate(text, { from, to });
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error });
  }
};
