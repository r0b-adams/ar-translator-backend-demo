import Joi from 'joi';

const MIN_LENGTH = 12;
const MAX_LENGTH = 32;
const SALT_ROUNDS = 10;
const PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{12,64}$/;

export enum PayloadType {
  USERNAME = 'username',
  PASSWORD = 'password',
  EMAIL = 'email',
}

export const Constants = {
  MIN_LENGTH,
  MAX_LENGTH,
  SALT_ROUNDS,
};

const joi_userSchema = Joi.object({
  username: Joi.string().token().required(),
  password: Joi.string()
    .min(MIN_LENGTH)
    .max(MAX_LENGTH)
    .pattern(PASSWORD_REGEX)
    .required(),
  email: Joi.string().email().required(),
});

export const validate = (type: string) => (payload: string) => {
  const schema = joi_userSchema.extract(type);
  const { error } = schema.validate(payload);
  return error ? false : true; // error undefined if payload is valid
};
