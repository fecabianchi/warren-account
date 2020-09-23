import * as Joi from 'joi';
import ValidationException from '../exceptions/ValidationException';
import IDummyObject from '../interfaces/IDummyObject';

export const validator = (data: object, schema: Joi.ObjectSchema, options?: Joi.ValidationOptions): IDummyObject => {
  const defaultOptions = {
    abortEarly: false,
    stripUnknown: { objects: true },
  };

  const { error, value } = schema.validate(data, Object.assign(defaultOptions, options));

  if (error) {
    const errorDetails = error.details.reduce((accumulate: IDummyObject, err: Joi.ValidationErrorItem) => {
      if (err.context && err.context.key) {
        accumulate[err.context.key] = err.message;
      }

      return accumulate;
    }, {});

    throw new ValidationException(errorDetails);
  }

  return value;
};
