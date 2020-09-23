import { User } from '../models';

export default class UserRepository {
  private model = User;

  public findOne(email: string) {
    return this.model.findOne({ email });
  }
}
