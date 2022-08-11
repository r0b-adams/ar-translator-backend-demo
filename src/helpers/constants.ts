const MIN_LENGTH = 12;
const SALT_ROUNDS = 10;
const PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{12,64}$/;

export { MIN_LENGTH, SALT_ROUNDS, PASSWORD_REGEX };
