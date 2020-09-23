import { APIGatewayProxyEvent } from 'aws-lambda';
import { validator } from '../validators';
import PaymentValidator from '../validators/PaymentValidator';
import PaymentService from '../services/PaymentService';

export default class PaymentController {
  private paymentService: PaymentService;

  constructor() {
    this.paymentService = new PaymentService();
  }

  async processPayment(event: APIGatewayProxyEvent) {
    const { body } = validator(event, PaymentValidator.processPayment());
    const { principalId } = event.requestContext.authorizer;

    const result = await this.paymentService.process(principalId, body);

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    }
  }
}
