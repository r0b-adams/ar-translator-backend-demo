import { Schema, model } from 'mongoose';

import profile from './_profile';
import credentials from './_credentials';
import { UserDoc, UserModel } from './interfaces';

const userSchema = new Schema<UserDoc, UserModel>({
  profile,
  credentials,
});

const User = model<UserDoc, UserModel>('user', userSchema);

export default User;
