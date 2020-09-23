import { connection } from '../config/db';
import { IAccount } from '../interfaces/IAccount';
import AccountRepository from '../repositories/AccountRepository';
import MiscUtils from '../utils/MiscUtils';

export default class AccountService {
  private accountRepository: AccountRepository;

  constructor() {
    this.accountRepository = new AccountRepository();
  }

  async withdraw(account: IAccount, value: number) {
    const session = await connection.startSession();

    await session.withTransaction(async () => {
      MiscUtils.checkBalanceCriteria(account, value);
      const balance = account.balance - value;
      return this.accountRepository.updateBalance(account.id, balance)
    });

    session.endSession();
    return this.accountRepository.findById(account.id);
  }

  async deposit(account: IAccount, value: number) {
    const session = await connection.startSession();

    await session.withTransaction(async () => {
      const balance = account.balance + Math.abs(value);
      return this.accountRepository.updateBalance(account.id, balance);
    });

    session.endSession();
    return this, this.accountRepository.findById(account.id);
  }
}
