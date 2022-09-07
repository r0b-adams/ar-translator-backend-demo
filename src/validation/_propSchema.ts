import Joi from 'joi';

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX } from '../helpers/constants';

/**
 * definitions for individual properties
 */

export const username = Joi.string().required().messages({
  'string.empty': `Username is required`,
});

export const email = Joi.string().required().email().messages({
  'string.empty': `Email is required`,
  'string.email': `A valid email is required`,
});

export const password = Joi.string()
  .required()
  .min(PASSWORD_MIN_LENGTH)
  .pattern(PASSWORD_REGEX)
  .messages({
    'string.empty': `Password is required`,
    'string.min': `Password should have a minimum length of ${PASSWORD_MIN_LENGTH}`,
    'string.pattern.base': `Password must contain a digit, an uppercase character, a lowercase character, and at least one special character: ! @ # $ % ^ & *`,
  });

export const img = Joi.string().required().base64().messages({
  'string.empty': `Image data required`,
  'string.base64': 'Valid base64 data required',
});

export const languageCode = Joi.string().required().max(2).messages({
  'string.max': 'Valid language code required',
});

export const text = Joi.string().required().messages({
  'string.empty': 'no text to translate',
});

export const from = languageCode.messages({
  'string.empty': 'source language is required',
});

export const to = languageCode.messages({
  'string.empty': 'target language is required',
});

export const b64 = Joi.string().required().base64().messages({
  'string.empty': `data not found`,
  'string.base64': `data must be valid base64 encoding`,
});
