import { model, Model, Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

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
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

userSchema.pre<User>('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

const User: Model<User> = model('User', userSchema);

export default User;
