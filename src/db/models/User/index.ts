import { model, Model, Schema } from 'mongoose';

import { UserDoc } from './interface';
import { hashPassword, validatePassword, validateUser } from './middleware';

const userSchema = new Schema<UserDoc>(
  {
    username: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.pre<UserDoc>('save', validatePassword);
userSchema.pre<UserDoc>('save', hashPassword);
userSchema.pre<UserDoc>('save', validateUser);

const User: Model<UserDoc> = model('User', userSchema);

export { User, UserDoc };
