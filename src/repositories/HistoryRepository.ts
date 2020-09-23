import { IHistory } from '../interfaces/IHistory';
import { History } from '../models';

export default class HistoryRepository {
  private model = History;

  public findAllByUserId(id: string) {
    return this.model.find({ userId: id })
  }

  public create(history: IHistory) {
    return this.model.create(history);
  }
}
