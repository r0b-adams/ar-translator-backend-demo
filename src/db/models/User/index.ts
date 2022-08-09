import bcrypt from 'bcrypt';
import { model, Model, Schema, Document } from 'mongoose';
import { handleValidate, joi_userSchema } from './validation';
import { Constants, PayloadType } from './constants';

const { MAX_LENGTH, MIN_LENGTH, SALT_ROUNDS } = Constants;
const { USERNAME, PASSWORD, EMAIL } = PayloadType;

interface User extends Document {
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<User>(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
      trim: true,
      maxlength: [MAX_LENGTH, `maximum username length is ${MAX_LENGTH}`],
      validate: {
        validator: handleValidate(USERNAME),
        message: (_props) => 'invalid username',
      },
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      trim: true,
      validate: {
        validator: handleValidate(EMAIL),
        message: (_props) => `invalid email`,
      },
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      trim: true,
      minlength: [MIN_LENGTH, `password length must be at least ${MIN_LENGTH}`],
      maxlength: [MAX_LENGTH, `maximum password length is ${MAX_LENGTH}`],
      validate: {
        validator: handleValidate(PASSWORD),
        message: (_props) => 'invalid password',
      },
    },
  },
  // options
  { timestamps: true }
);

userSchema.pre<User>('save', async function () {
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

const User: Model<User> = model('User', userSchema);

export { handleValidate, joi_userSchema };
export default User;
