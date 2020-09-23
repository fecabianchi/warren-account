import createEvent from '@serverless/event-mocks';
import * as mongoose from 'mongoose';
import { connection } from '../../src/config/db';
import AccountController from '../../src/controllers/AccountController';
import Account from '../../src/models/Account';
import * as dayjs from 'dayjs';

describe('AccountControllerTest', () => {
  const accountController = new AccountController();

  beforeEach(async () => {
    await Account.create({
      _id: mongoose.Types.ObjectId('4edd40c86762e0fb12000003'),
      balance: 1000.00,
      name: 'Teste account',
      lastRemuneration: dayjs().subtract(1, 'd').format(),
      userId: mongoose.Types.ObjectId('5edd40c86762e0fb12000003')
    });
  });

  afterEach(async () => {
    await Account.deleteMany({});
  });

  afterAll(async () => {
    await connection.close()
  });

  describe('Show', () => {
    it('shoud show a account', async () => {
      const event = createEvent('aws:apiGateway', {
        httpMethod: 'GET',
        requestContext: {
          authorizer: {
            principalId: '5edd40c86762e0fb12000003'
          }
        }
      } as any);

      const result = await accountController.show(event);
      const parsedBody = JSON.parse(result.body);
      expect(result.statusCode).toBe(200);
      expect(parsedBody._id).toBe('4edd40c86762e0fb12000003');
      expect(parsedBody.userId).toBe('5edd40c86762e0fb12000003');
      expect(parsedBody.balance).toBe(1010);
    });
  });

  describe('Deposit', () => {
    it('should fail by validation', async () => {
      const event = createEvent('aws:apiGateway', {
        httpMethod: 'POST',
        body: JSON.stringify({})
      } as any);

      try {
        await accountController.deposit(event);
      } catch (err) {
        expect(err.statusCode).toBe(422);
        expect(err.body.code).toBe('validation-exception');
      }
    });

    it('should deposit', async () => {
      const event = createEvent('aws:apiGateway', {
        httpMethod: 'POST',
        requestContext: {
          authorizer: {
            principalId: '5edd40c86762e0fb12000003'
          }
        },
        body: JSON.stringify({
          value: 100.00
        })
      } as any);

      const result = await accountController.deposit(event);
      const parsedBody = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      expect(parsedBody.balance).toBe(1100.00);
    });
  });

  describe('Withdraw', () => {
    it('should fail by validation', async () => {
      const event = createEvent('aws:apiGateway', {
        httpMethod: 'POST',
        body: JSON.stringify({})
      } as any);

      try {
        await accountController.withdraw(event);
      } catch (err) {
        expect(err.statusCode).toBe(422);
        expect(err.body.code).toBe('validation-exception');
      }
    });

    it('should fail by trying to withdraw more than whats on the balance', async () => {
      const event = createEvent('aws:apiGateway', {
        httpMethod: 'POST',
        requestContext: {
          authorizer: {
            principalId: '5edd40c86762e0fb12000003'
          }
        },
        body: JSON.stringify({
          value: 10000.00
        })
      } as any);

      try {
        await accountController.withdraw(event);
      } catch (err) {
        expect(err.statusCode).toBe(422);
        expect(err.body.code).toBe('validation-exception');
      }
    });

    it('should withdraw', async () => {
      const event = createEvent('aws:apiGateway', {
        httpMethod: 'POST',
        requestContext: {
          authorizer: {
            principalId: '5edd40c86762e0fb12000003'
          }
        },
        body: JSON.stringify({
          value: 100.00
        })
      } as any);

      const result = await accountController.withdraw(event);
      const parsedBody = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      expect(parsedBody.balance).toBe(900.00);
    });
  });
});
