import { APIGatewayProxyEvent } from 'aws-lambda';
import AuthService from '../services/AuthService';
import { validator } from '../validators';
import UserValidator from '../validators/UserValidator';

export default class UserController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async login(event: APIGatewayProxyEvent) {
    const { body } = validator(event, UserValidator.login());

    const result = await this.authService.authenticate(body)

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    }
  }
}
