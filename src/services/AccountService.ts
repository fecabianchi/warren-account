import { connection } from '../config/db';
import { OperationEnum } from '../enums/OperationEnum';
import { IAccount } from '../interfaces/IAccount';
import AccountRepository from '../repositories/AccountRepository';
import HistoryRepository from '../repositories/HistoryRepository';
import HistoryTransform from '../transforms/HistoryTransform';
import MiscUtils from '../utils/MiscUtils';
import DateUtils from '../utils/DateUtils';

export default class AccountService {
  private accountRepository: AccountRepository;
  private historyRepository: HistoryRepository;
  private tax: number;

  constructor() {
    this.accountRepository = new AccountRepository();
    this.historyRepository = new HistoryRepository();
    this.tax = 1;
  }

  remunerate(account: IAccount) {
    const date = new Date();
    const days = Math.floor(DateUtils.dateDiff(account.lastRemuneration, date));
    account.balance += account.balance * ((this.tax / 100) * days);
    account.lastRemuneration = date;

    return account.save();
  }

  async withdraw(account: IAccount, value: number) {
    const session = await connection.startSession();

    await session.withTransaction(async () => {
      MiscUtils.checkBalanceCriteria(account, value);
      const balance = account.balance - value;
      return this.accountRepository.updateBalance(account.id, balance)
    });

    const response = await this.accountRepository.findById(account.id);
    await this.historyRepository.create(HistoryTransform.input(account, response, value, OperationEnum.WITHDRAW));
    session.endSession();

    return response;
  }

  async deposit(account: IAccount, value: number) {
    const session = await connection.startSession();

    await session.withTransaction(async () => {
      const balance = account.balance + Math.abs(value);
      return this.accountRepository.updateBalance(account.id, balance);
    });

    const response = await this.accountRepository.findById(account.id);
    await this.historyRepository.create(HistoryTransform.input(account, response, value, OperationEnum.DEPOSIT));
    session.endSession();

    return response;
  }
}
