import { Context } from 'aws-lambda';
import { NextFunction } from 'middy';
import IDummyObject from '../interfaces/IDummyObject';

export default () => {
  return ({
    before: (handler: { event: IDummyObject; context: Context } & IDummyObject, next: NextFunction) => {
      handler.context.callbackWaitsForEmptyEventLoop = false;
      return next();
    },
  });
};
