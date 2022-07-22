const { viewer } = require('../../google_apis/clients');

const fs = require('fs');
const path = require('path');

const analyzeObjects = async (_req, res) => {
  try {
    // testing with a static file to send to Google Vision
    const fileName = path.join(__dirname, '../../images/test_1.jpg');

    /*
    here the image data is passed in a Buffer obj read from local file
    Buffer objects are used to represent a fixed-length sequence of bytes.
    Many Node.js APIs support Buffers, including the Google Vision API client
    https://nodejs.org/api/buffer.html#class-buffer
    */
    // const file_0 = fs.readFileSync(fileName);
    // const [result_buff] = await viewer.objectLocalization(file_0);
    // console.log(result_buff);

    /*
    here we pass image encoded as base64 data, but we have to pass it in an object with image key
    this is ultimately what the Google client will coerce before sending request to their servers
    likely want to just pass base64 directly to Google without fussing with file read / write
    */
    const file = fs.readFileSync(fileName);
    const base64 = Buffer.from(file).toString('base64');
    const [result_64] = await viewer.objectLocalization({
      image: { content: base64 },
    });

    const objects = result_64.localizedObjectAnnotations;

    res.status(200).json({ objects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

module.exports = { analyzeObjects };
