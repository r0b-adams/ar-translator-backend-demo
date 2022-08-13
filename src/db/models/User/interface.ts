import { Document } from 'mongoose';

export interface UserDoc extends Document {
  username: string;
  password: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
