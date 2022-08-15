import { Schema } from 'mongoose';

import { ProfileDoc } from './interfaces';
import { validateProfile } from './middleware';

/**
 *
 */
const profile = new Schema<ProfileDoc>(
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

profile.pre('save', validateProfile);

export default profile;
