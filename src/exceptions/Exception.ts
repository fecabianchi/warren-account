import IErrorResponse from '../interfaces/IErrorResponse';

export default class Exception extends Error {
  protected statusCode: number;
  protected body: IErrorResponse;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.body = {
      code,
      message,
    };
    this.statusCode = status;
  }

  public getStatusCode(): number {
    return this.statusCode;
  }

  public getBody(): IErrorResponse {
    return this.body;
  }
}
