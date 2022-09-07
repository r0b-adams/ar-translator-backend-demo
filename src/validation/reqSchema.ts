import Joi from 'joi';

import { username, email, password, from, to, img, text } from './_propSchema';

export enum ReqType {
  POST_REGISTER = 'POST/auth/register',
  POST_LOGIN = 'POST/auth/login',
  POST_TRANSLATE = 'POST/translateAPI/translate',
  POST_OBJECTS = 'POST/visionAPI/objects',
}

const schema = {
  POST_REGISTER: Joi.object({
    username,
    email,
    password,
  }),
  POST_LOGIN: Joi.object({
    username,
    password: Joi.string() // just check for truthiness on a login request
      .required()
      .messages({ 'string.empty': 'Password is required' }),
  }),
  POST_TRANSLATE: Joi.object({
    text,
    from,
    to,
  }),
  POST_OBJECTS: Joi.object({
    img,
    to,
  }),
};

const reqBodySchema = (type: string): Joi.ObjectSchema<any> => {
  switch (type) {
    case ReqType.POST_REGISTER:
      return schema.POST_REGISTER;

    case ReqType.POST_LOGIN:
      return schema.POST_LOGIN;

    case ReqType.POST_TRANSLATE:
      return schema.POST_TRANSLATE;

    case ReqType.POST_OBJECTS:
      return schema.POST_OBJECTS;

    default:
      throw new Error('Error finding validation schema');
  }
};

export default reqBodySchema;
