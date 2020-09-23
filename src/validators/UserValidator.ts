import * as Joi from 'joi';

export default class UserValidator {
  public static login() {
    return Joi.object({
      body: this.userSchema()
    })
  }

  protected static userSchema() {
    return Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required()
    })
  }
}
