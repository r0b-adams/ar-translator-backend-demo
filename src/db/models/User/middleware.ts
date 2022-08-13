import bcrypt from 'bcrypt';
import { PreSaveMiddlewareFunction } from 'mongoose';

import { UserDoc } from './interface';
import UserModelSchema, { Path } from '../../../validation/userSchema';
import { SALT_ROUNDS } from '../../../helpers/constants';

export const validatePassword: PreSaveMiddlewareFunction<UserDoc> = function (
  next
) {
  const { $set: changes } = this.getChanges();

  if (changes && Path.PASSWORD in changes) {
    const { error } = UserModelSchema(Path.PASSWORD).validate(this.password, {
      abortEarly: false,
    });
    if (error) throw error;
  }

  next();
};

export const hashPassword: PreSaveMiddlewareFunction<UserDoc> =
  async function () {
    const { $set: changes } = this.getChanges();

    if (changes && Path.PASSWORD in changes) {
      this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    }
  };

export const validateUser: PreSaveMiddlewareFunction<UserDoc> = function (
  next
) {
  const user = {
    username: this.username,
    email: this.email,
  };

  const { error } = UserModelSchema(Path.PROFILE).validate(user, {
    abortEarly: false, // collect all errors
  });
  if (error) throw error;

  next();
};
