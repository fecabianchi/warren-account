import { IAccount } from "../interfaces/IAccount";
import { IHistory } from "../interfaces/IHistory";

export default class HistoryTransform {
  public static input(account: IAccount, updatedAccount: IAccount, value: any, operation: string): IHistory {
    return {
      userId: account.userId,
      previousBalance: account.balance,
      currentBalance: updatedAccount.balance,
      value,
      operation
    }
  }
}
