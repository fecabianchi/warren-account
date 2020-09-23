import Exception from './Exception';

export default class UnauthorizedException extends Exception {
  constructor(message = 'Unauthorized') {
    super(401, 'unauthorized-exception', message);
  }
}
