import { Schema } from 'mongoose';

import { ProfileDoc } from './types';
import { validateProfile } from './middleware';

/**
 * schema for Profile subdocuments
 */
const profileSchema = new Schema<ProfileDoc>(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'username is required'],
      unique: true,
    },
    email: {
      type: String,
      trim: true,
      required: [true, 'email is required'],
      unique: true,
    },
  },
  {
    _id: false,
    id: false,
  }
);

profileSchema.pre('save', validateProfile);

export default profileSchema;
