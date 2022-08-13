import Joi from 'joi';

import { email, password, username } from './propSchema';

type UserSchemaTypes = Joi.StringSchema | Joi.ObjectSchema<any>;

export enum Path {
  PROFILE = 'profile',
  PASSWORD = 'password',
}

const schema = {
  PROFILE: Joi.object({
    username,
    email,
  }),
  PASSWORD: password,
};

const userModelSchema = (type: string): UserSchemaTypes => {
  switch (type) {
    case Path.PROFILE:
      return schema.PROFILE;

    case Path.PASSWORD:
      return schema.PASSWORD;

    default:
      throw new Error('Error finding validation schema');
  }
};

export default userModelSchema;
