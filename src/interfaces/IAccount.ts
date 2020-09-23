import { Types, Document } from 'mongoose';

export interface IAccount extends Document {
  _id: Types.ObjectId;
  name: string;
  balance: number;
  userId: Types.ObjectId;
  lastRemuneration: Date;
}
