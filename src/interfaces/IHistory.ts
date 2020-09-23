import { Types } from 'mongoose';

export interface IHistory  {
  userId: Types.ObjectId;
  previousBalance: number;
  currentBalance: number;
  value: number;
  operation: string;
}
