import bcrypt from 'bcrypt';
import { model, Model, Schema, Document } from 'mongoose';

import { Constants } from '../../../helpers/constants';

const { SALT_ROUNDS } = Constants;

export interface UserDoc extends Document {
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

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
  // options
  { timestamps: true }
);

userSchema.pre<UserDoc>('save', async function () {
  if (this.isNew) this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

const User: Model<UserDoc> = model('User', userSchema);

export default User;
