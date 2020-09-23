import * as bcrypt from 'bcryptjs';
import { Document, Schema } from 'mongoose';
import { connection } from '../config/db';
import { IUser } from "../interfaces/IUser";

interface UserModel extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  }
});

UserSchema.pre<UserModel>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  return next();
});

UserSchema.methods.comparePassword = function(candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default connection.model<UserModel>('User', UserSchema);
