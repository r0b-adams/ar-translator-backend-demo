import Joi from 'Joi';
import { Constants } from './constants';

const { MAX_LENGTH, MIN_LENGTH, PASSWORD_REGEX } = Constants;

const Joi_userSchema = Joi.object({
  username: Joi.string().token().required(),
  password: Joi.string()
    .min(MIN_LENGTH)
    .max(MAX_LENGTH)
    .pattern(PASSWORD_REGEX)
    .required(),
  email: Joi.string().email().required(),
});

const handleValidate = (type: string) => (payload: string) => {
  const schema = Joi_userSchema.extract(type);
  const { error } = schema.validate(payload);
  return error ? false : true; // error undefined if payload is valid
};

export default handleValidate;
