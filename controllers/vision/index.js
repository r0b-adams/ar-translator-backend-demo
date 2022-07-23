const { viewer } = require('../../google_apis/clients');

const analyzeObjects = async (req, res) => {
  try {
    const { img } = req.body; // arrives as a string of encoded data of that looks like data:image/[jpeg|png];base64, [encodedASCIIstr]
    const [, b64encodedImage] = img.split(','); // ignore the prefixes and grab just the b64 str

    const request = {
      image: { content: b64encodedImage },
    };

    const [result] = await viewer.objectLocalization(request);
    const objects = result.localizedObjectAnnotations;

    res.status(200).json(objects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

module.exports = { analyzeObjects };
