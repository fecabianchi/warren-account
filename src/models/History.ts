import { Document, Schema, Types } from 'mongoose';
import { connection } from '../config/db';
import { IHistory } from '../interfaces/IHistory';

interface HistoryModel extends IHistory, Document { }

const HistorySchema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true
  },
  previousBalance: {
    type: Number,
    required: true
  },
  currentBalance: {
    type: Number,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  operation: {
    type: String,
    enum: ['deposit', 'withdraw', 'payment'],
    required: true
  }
}, { timestamps: true });

export default connection.model<HistoryModel>('History', HistorySchema);
