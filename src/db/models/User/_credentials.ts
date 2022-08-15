import { Schema } from 'mongoose';

import { CredentialsDoc } from './interfaces';
import {
  checkPasswordChanged,
  validatePassword,
  hashPassword,
} from './middleware';

/**
 *
 */
const credentials = new Schema<CredentialsDoc>(
  {
    password: {
      type: String,
      trim: true,
      required: [true, 'password is required'],
    },
  },

  {
    _id: false,
    id: false,
  }
);
credentials.pre('save', checkPasswordChanged);
credentials.pre('save', validatePassword);
credentials.pre('save', hashPassword);

export default credentials;
