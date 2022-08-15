import { Model, Document } from 'mongoose';

export interface ProfileDoc extends Document {
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CredentialsDoc extends Document {
  password: string;
}

export interface UserDoc extends Document {
  profile: ProfileDoc;
  credentials: CredentialsDoc;
}

export type UserModel = Model<UserDoc>;
