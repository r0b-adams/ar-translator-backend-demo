import { Schema } from 'mongoose';

import { CredsDoc } from './types';
import { validatePassword, hashPassword } from './middleware';

/**
 * schema for Credentials subdocuments
 */
const credentialsSchema = new Schema<CredsDoc>(
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

credentialsSchema.pre('save', validatePassword);
credentialsSchema.pre('save', hashPassword);

export default credentialsSchema;
