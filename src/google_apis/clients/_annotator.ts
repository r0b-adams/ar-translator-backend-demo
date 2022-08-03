import { ImageAnnotatorClient } from '@google-cloud/vision';
import keyFilename from '../credentials';

const annotator = new ImageAnnotatorClient({ keyFilename });

export default annotator;
