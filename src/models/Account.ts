import { Schema } from 'mongoose';
import { connection } from '../config/db';
import { IAccount } from '../interfaces/IAccount';

const AccountSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0.00
  },
  lastRemuneration: {
    type: Date,
    default: new Date()
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

export default connection.model<IAccount>('Account', AccountSchema);
