import Joi from 'joi';

import { MIN_LENGTH, PASSWORD_REGEX } from '../helpers/constants';

enum ReqType {
  POST_REGISTER = 'POST/auth/register',
  POST_LOGIN = 'POST/auth/login',
  POST_TRANSLATE = 'POST/translateAPI/translate',
  POST_OBJECTS = 'POST/visionAPI/objects',
}

export const RequestBodySchema: { [key: string]: Joi.ObjectSchema<any> } = {};

RequestBodySchema[ReqType.POST_REGISTER] = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().min(MIN_LENGTH).pattern(PASSWORD_REGEX).required(),
});

RequestBodySchema[ReqType.POST_LOGIN] = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

RequestBodySchema[ReqType.POST_TRANSLATE] = Joi.object({
  text: Joi.string().required(),
  from: Joi.string().required().max(2),
  to: Joi.string().required().max(2),
});

RequestBodySchema[ReqType.POST_OBJECTS] = Joi.object({
  img: Joi.string().dataUri(),
  to: Joi.string().max(2),
});
