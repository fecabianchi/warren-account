import { Account } from '../models';

export default class AccountRepository {
  private model = Account;

  public findAll(userId: string) {
    return this.model.find({
      userId: { $ne: userId }
    })
  }

  public findOneByUserId(id: string) {
    return this.model.findOne({ userId: id })
  }

  public findById(id: string) {
    return this.model.findById(id);
  }

  public async updateBalance(_id: string, balance: number) {
    return this.model.updateOne({ _id }, { balance })
  }
}
