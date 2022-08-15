import { Model, Document, Types } from 'mongoose';

export interface ProfileDoc {
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CredsDoc {
  password: string;
}

export interface UserDoc {
  profile: ProfileDoc;
  credentials: CredsDoc;
}

type UserQuery = Promise<
  | (Document<unknown, any, UserDoc> &
      UserDoc & {
        _id: Types.ObjectId;
      })
  | null
>;

export interface UserModel extends Model<UserDoc> {
  _byProfProp(property: string, value: string): UserQuery;
  findByUsername(value: string): UserQuery;
  findByEmail(value: string): UserQuery;
}
