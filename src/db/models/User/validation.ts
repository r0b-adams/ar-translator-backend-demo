import joi from 'joi';
import { Constants } from './constants';

const { MAX_LENGTH, MIN_LENGTH, PASSWORD_REGEX } = Constants;

export const joi_userSchema = joi.object({
  username: joi.string().token().required(),
  password: joi
    .string()
    .min(MIN_LENGTH)
    .max(MAX_LENGTH)
    .pattern(PASSWORD_REGEX)
    .required(),
  email: joi.string().email().required(),
});

export const handleValidate = (type: string) => (payload: string) => {
  const schema = joi_userSchema.extract(type);
  const { error } = schema.validate(payload);
  return error ? false : true; // error undefined if payload is valid
};

export default handleValidate;
