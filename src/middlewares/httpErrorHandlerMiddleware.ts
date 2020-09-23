import { Context } from 'aws-lambda';
import { NextFunction } from 'middy';
import Exception from '../exceptions/Exception';
import InternalException from '../exceptions/InternalException';
import IDummyObject from '../interfaces/IDummyObject';

const normalizeError = (err: Error & IDummyObject) => {
  if (err instanceof Exception) {
    return err;
  }

  return new InternalException(err.message)
};

export default () => {
  return ({
    onError: (handler: { event: IDummyObject; context: Context } & IDummyObject, next: NextFunction) => {
      const exception = normalizeError(handler.error);

      handler.response = {
        body: JSON.stringify(exception.getBody()),
        headers: { 'Content-Type': 'application/json' },
        statusCode: exception.getStatusCode(),
      };

      return next();
    },
  });
};
