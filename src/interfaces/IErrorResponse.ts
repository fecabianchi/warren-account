import IDummyObject from './IDummyObject';

export default interface IErrorResponse extends IDummyObject {
  code: string;
  message: string;
}
