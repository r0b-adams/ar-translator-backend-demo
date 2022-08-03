import { v2 } from '@google-cloud/translate';
import keyFilename from '../credentials';

const { Translate } = v2;
const translator = new Translate({ keyFilename });

export default translator;
