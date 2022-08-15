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
  return this._byProfProp('email', value);
});

userSchema.static('findByUsername', async function findByUsername(value: string) {
  return this._byProfProp('username', value);
});

userSchema.static(
  '_byProfProp',

  // helper to create queries by profile subdoc property names
  async function _byProfProp(property: string, value: string) {
    const conditions: { [key: string]: string } = {};
    conditions[`profile.${property}`] = value;
    return this.findOne(conditions);
  }
);

const User = model<UserDoc, UserModel>('user', userSchema);

export default User;
