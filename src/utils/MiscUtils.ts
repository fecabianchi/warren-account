import * as fs from 'fs';
import ValidationException from '../exceptions/ValidationException';
import { IAccount } from '../interfaces/IAccount';

export default class MiscUtils {
  static fileExists(path: string) {
    try {
      return fs.statSync(path).isFile();
    } catch (err) {
      return false;
    }
  }

  static checkBalanceCriteria(account: IAccount, value: number) {
    if (account.balance < Math.abs(value)) {
      throw new ValidationException('Invalid balance')
    }

    return true
  }
}
