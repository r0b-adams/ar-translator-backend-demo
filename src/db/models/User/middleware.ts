import bcrypt from 'bcrypt';
import { PreSaveMiddlewareFunction } from 'mongoose';

import userSchema, { Path } from '../../../validation/userSchema';
import { CredentialsDoc, ProfileDoc } from './interfaces';
import { SALT_ROUNDS } from '../../../helpers/constants';

// Profile Subdoc middleware
// fires when save() called on User parent doc

/**
 *
 */
export const validateProfile: PreSaveMiddlewareFunction<ProfileDoc> = function (
  next
) {
  const profile = this.toObject();

  const { error } = userSchema(Path.PROFILE).validate(profile, {
    presence: 'required',
    abortEarly: false,
  });
  if (error) throw error;
  next();
};

// Credentials Subdoc middleware
// fires when save() called on User parent doc

/**
 * Set locals object property if password was changed
 */
export const checkPasswordChanged: PreSaveMiddlewareFunction<CredentialsDoc> =
  function () {
    if (this.modifiedPaths().includes(Path.PASSWORD)) {
      this.$locals.passwordChanged = true;
    }
  };

/**
 * if password was changed, validate before hashing
 */
export const validatePassword: PreSaveMiddlewareFunction<CredentialsDoc> =
  function (next) {
    const { passwordChanged } = this.$locals;

    if (passwordChanged) {
      const { error } = userSchema(Path.PASSWORD).validate(this.password, {
        abortEarly: false,
      });
      if (error) throw error;
    }
    next();
  };

/**
 * hash password
 */
export const hashPassword: PreSaveMiddlewareFunction<CredentialsDoc> =
  async function () {
    const { passwordChanged } = this.$locals;

    if (passwordChanged) {
      this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    }
  };
