import Joi from 'joi';

import { MIN_LENGTH, PASSWORD_REGEX } from '../helpers/constants';

/**
 * definitions for individual properties
 */

export const basicRequireStr = Joi.string().required().messages({
  'string.empty': `{#label} is required`,
});

export const username = basicRequireStr.label('username');

export const email = Joi.string().required().email().messages({
  'string.empty': `email is required`,
  'string.email': `a valid email is required`,
});

export const password = Joi.string()
  .required()
  .min(MIN_LENGTH)
  .pattern(PASSWORD_REGEX)
  .messages({
    'string.empty': `password is required`,
    'string.min': `password should have a minimum length of ${MIN_LENGTH}`,
    'string.pattern.base': `password must contain a digit, an uppercase character, a lowercase character, and at least one special character: ! @ # $ % ^ & *`,
  });

export const img = Joi.string()
  .label('image data')
  .required()
  .dataUri()
  .messages({
    'string.empty': `image data required`,
    'string.dataUri': 'valid data URI required',
  });

export const languageCode = Joi.string().required().max(2).messages({
  'string.empty': `{#label} is required`,
  'string.max': 'valid language code required',
});

export const text = basicRequireStr.label('text');

export const from = languageCode.label('source language');
export const to = languageCode.label('target language');

export const b64 = Joi.string().required().base64().messages({
  'string.empty': `data not found`,
  'string.base64': `data must be valid base64 encoding`,
});
