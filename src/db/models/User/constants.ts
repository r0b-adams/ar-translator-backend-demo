export enum PayloadType {
  USERNAME = 'username',
  PASSWORD = 'password',
  EMAIL = 'email',
}

export const Constants = {
  MIN_LENGTH: 12,
  MAX_LENGTH: 32,
  SALT_ROUNDS: 10,
  PASSWORD_REGEX: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{12,64}$/,
};
