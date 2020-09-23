import * as Joi from 'joi';

export default class PaymentValidator {
  public static processPayment() {
    return Joi.object({
      body: this.paymentSchema()
    })
  }

  protected static paymentSchema() {
    return Joi.object({
      description: Joi.string().required(),
      destinationAccount: Joi.string().required(),
      value: Joi.number().required()
    })
  }
}
