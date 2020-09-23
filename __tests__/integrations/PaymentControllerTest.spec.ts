import createEvent from '@serverless/event-mocks';
import * as mongoose from 'mongoose';
import { connection } from '../../src/config/db';
import PaymentController from '../../src/controllers/PaymentController';
import Account from '../../src/models/Account';

describe('PaymentControllerTest', () => {
  const paymentController = new PaymentController();

  beforeAll(async () => {
    await Account.insertMany([
      {
        _id: mongoose.Types.ObjectId('6edd40c86762e0fb12000003'),
        balance: 1000.00,
        name: 'Test account',
        userId: mongoose.Types.ObjectId('7edd40c86762e0fb12000003')
      },
      {
        _id: mongoose.Types.ObjectId('8edd40c86762e0fb12000003'),
        balance: 10000.00,
        name: 'Test account 2',
        userId: mongoose.Types.ObjectId('9edd40c86762e0fb12000003')
      }
    ])
  });

  afterAll(async () => {
    await Account.deleteMany({});
    await connection.close()
  });

  describe('Process payment', () => {
    it('should process a payment', async () => {
      const event = createEvent('aws:apiGateway', {
        httpMethod: 'POST',
        requestContext: {
          authorizer: {
            principalId: '7edd40c86762e0fb12000003'
          }
        },
        body: {
          description: 'test payment',
          destinationAccount: '8edd40c86762e0fb12000003',
          value: 100.00
        }
      } as any);

      const result = await paymentController.processPayment(event);
      const parsedBody = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      expect(parsedBody.status).toBe('complete');
    });
  });
});
