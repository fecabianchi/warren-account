import { IPayment } from '../interfaces/IPayment';
import { Payment } from '../models';

export default class PaymentRepository {
  private model = Payment;

  public create(payment: IPayment) {
    return this.model.create(payment);
  }

  public getBySourceAccount(sourceAccount: string) {
    return this.model.findOne({ sourceAccount });
  }
}
