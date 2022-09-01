import { Router } from 'express';

import { translator } from '../../google_apis/clients';
import { authorize, validateReqBody } from '../../middleware';

const router = Router();

router.get('/languages', authorize, async (_req, res, next) => {
  try {
    const [languages] = await translator.getLanguages();
    res.status(200).json(languages);
  } catch (err) {
    next(err);
  }
});

router.post(
  '/translate',
  authorize,
  validateReqBody,
  async (req, res, next) => {
    try {
      const { text, from, to } = req.body;
      const [result] = await translator.translate(text, { from, to });
      res.status(200).json({ result });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
