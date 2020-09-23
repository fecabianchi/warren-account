import Exception from './Exception';

export default class ValidationException extends Exception {
  constructor(err: any) {
    super(422, 'validation-exception', `There are validation errors: ${err ? JSON.stringify(err) : null}`);
  }
}
