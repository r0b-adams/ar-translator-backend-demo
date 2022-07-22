const { translator } = require('../../google_apis/clients');

const postTranslate = async (req, res) => {
  try {
    const { text, from, to } = req.body;
    const [result] = await translator.translate(text, { from, to });
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getLanguages = async (_req, res) => {
  try {
    const [languages] = await translator.getLanguages();
    res.status(200).json({ languages });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { postTranslate, getLanguages };
