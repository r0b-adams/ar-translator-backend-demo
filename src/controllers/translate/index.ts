import { translator } from '../../google_apis/clients';
import { RequestHandler } from 'express';
import ReqBody from '../../@types/requests';
import ResBody from '../../@types/responses';
import Joi from 'joi';
import { AuthError } from '../../helpers/errors';

/*
 * GET /translateAPI/languages
 */
export const getLanguages: RequestHandler<{}, {}, ResBody.Languages> = async (
  req,
  res
) => {
  try {
    // check authorization
    if (!req.userID) throw new AuthError('Please login');

    // query Google Translte API
    const [languages] = await translator.getLanguages();
    res.status(200).json(languages);
  } catch (error) {
    // no credentials
    if (error instanceof AuthError) {
      res.status(401).json({ error: error.message });

      // misc
    } else if (error instanceof Error) {
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
    // check authorization
    if (!req.userID) throw new AuthError('Please login');

    // validate request body
    const schema = Joi.object({
      text: Joi.string().required(),
      from: Joi.string().required().max(2),
      to: Joi.string().required().max(2),
    });
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) throw error;

    // query Google Translate API
    const { text, from, to } = req.body;
    const [result] = await translator.translate(text, { from, to });
    res.status(200).json({ result });
  } catch (error) {
    //no credentials
    if (error instanceof AuthError) {
      res.status(401).json({ error: error.message });

      // Joi errors
    } else if (error instanceof Joi.ValidationError) {
      res.status(400).json({ error: error.message });

      // misc
    } else if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
