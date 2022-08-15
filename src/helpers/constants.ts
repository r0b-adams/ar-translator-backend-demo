const PASSWORD_MIN_LENGTH = 12;
const PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{12,64}$/;
const SALT_ROUNDS = 10;

const LANGCODE_ENGLISH = 'en';

export { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, SALT_ROUNDS, LANGCODE_ENGLISH };
