import bcrypt from 'bcrypt';
import { PreSaveMiddlewareFunction, Document } from 'mongoose';

import userSchema, { Path } from '../../../validation/userSchema';
import { CredsDoc, ProfileDoc } from './types';
import { SALT_ROUNDS } from '../../../helpers/constants';

// Profile subdoc presave middleware

export const validateProfile: PreSaveMiddlewareFunction<ProfileDoc & Document> =
  async function () {
    const profile = this.toObject();
    await userSchema(Path.PROFILE).validateAsync(profile, {
      presence: 'required',
      abortEarly: false,
    });
  };

// Credentials subdoc presave middleware

export const validatePassword: PreSaveMiddlewareFunction<CredsDoc & Document> =
  async function () {
    if (this.isModified(Path.PASSWORD)) {
      await userSchema(Path.PASSWORD).validateAsync(this.password);
    }
  };

export const hashPassword: PreSaveMiddlewareFunction<CredsDoc & Document> =
  async function () {
    if (this.isModified(Path.PASSWORD)) {
      this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    }
  };
