import * as Joi from 'joi';

export default class AccountValidator {
  public static withdraw() {
    return Joi.object({
      body: this.accountSchema()
    })
  }

  public static deposit() {
    return Joi.object({
      body: this.accountSchema()
    })
  }

  protected static accountSchema() {
    return Joi.object({
      value: Joi.number().positive().required()
    })
  }
}
