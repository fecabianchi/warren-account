import { Document, Schema, Types } from 'mongoose';
import { connection } from '../config/db';
import { IPayment } from '../interfaces/IPayment';

interface PaymentSchema extends IPayment, Document { }

const PaymentSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  sourceAccount: {
    type: Types.ObjectId,
    required: true,
    ref: 'Account'
  },
  destinationAccount: {
    type: Types.ObjectId,
    required: true,
    ref: 'Account'
  },
  status: {
    type: String,
    default: 'pending'
  },
  value: {
    type: Number,
    required: true
  }
});

export default connection.model<PaymentSchema>('Payment', PaymentSchema);
