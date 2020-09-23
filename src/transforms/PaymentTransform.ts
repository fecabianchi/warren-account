import { IPayment } from '../interfaces/IPayment';

export default class PaymentTransform {
  public static input(sourceAccount: string, payload: IPayment) {
    return {
      description: payload.description,
      value: payload.value,
      sourceAccount,
      destinationAccount: payload.destinationAccount,
    }
  }
}
