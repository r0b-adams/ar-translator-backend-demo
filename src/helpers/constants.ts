export const Constants = {
  MIN_LENGTH: 12,
  SALT_ROUNDS: 10,
  PASSWORD_REGEX: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{12,64}$/,
};
