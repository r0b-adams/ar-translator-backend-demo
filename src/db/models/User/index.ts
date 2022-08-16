import { Schema, model } from 'mongoose';

import profile from './_profile';
import credentials from './_credentials';
import { UserDoc, UserModel } from './types';

const userSchema = new Schema<UserDoc, UserModel>({
  profile,
  credentials,
});

// Model lvl static methods

userSchema.static('findByEmail', async function findByEmail(value: string) {
  return this._findByProfileProperty('email', value);
});

userSchema.static(
  'findByUsername',
  async function findByUsername(value: string) {
    return this._findByProfileProperty('username', value);
  }
);

userSchema.static(
  '_findByProfileProperty',
  // helper to create queries by profile subdocument property names
  async function _findByProfileProperty(property: string, value: string) {
    const conditions: { [key: string]: string } = {};
    conditions[`profile.${property}`] = value;
    return this.findOne(conditions);
  }
);

const User = model<UserDoc, UserModel>('user', userSchema);

export default User;
