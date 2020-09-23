import createEvent from '@serverless/event-mocks';
import { connection } from '../../src/config/db';
import HistoryController from '../../src/controllers/HistoryController';
import { OperationEnum } from '../../src/enums/OperationEnum';
import History from '../../src/models/History';

describe('HistoryControllerTest', () => {
  const historyController = new HistoryController();

  beforeAll(async () => {
    await History.deleteMany({});
    await History.insertMany([
      {
        userId: '5edd40c86762e0fb12000003',
        previousBalance: 1000.00,
        currentBalance: 900.00,
        value: 100.00,
        operation: OperationEnum.WITHDRAW
      },
      {
        userId: '5edd40c86762e0fb12000003',
        previousBalance: 900.00,
        currentBalance: 950.00,
        value: 50.00,
        operation: OperationEnum.DEPOSIT
      }
    ]);
  });

  afterAll(async () => {
    await History.deleteMany({});
    await connection.close()
  });

  describe('List', () => {
    it('should list', async () => {
      const event = createEvent('aws:apiGateway', {
        httpMethod: 'GET',
        requestContext: {
          authorizer: {
            principalId: '5edd40c86762e0fb12000003'
          }
        }
      } as any);

      const result = await historyController.list(event);
      const parsedBody = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      expect(parsedBody[0].userId).toBe('5edd40c86762e0fb12000003');
      expect(parsedBody[0].previousBalance).toBe(900);
      expect(parsedBody[0].currentBalance).toBe(950);
      expect(parsedBody[0].value).toBe(50);
      expect(parsedBody[0].operation).toBe(OperationEnum.DEPOSIT);
      expect(parsedBody[1].userId).toBe('5edd40c86762e0fb12000003');
      expect(parsedBody[1].previousBalance).toBe(1000);
      expect(parsedBody[1].currentBalance).toBe(900);
      expect(parsedBody[1].value).toBe(100);
      expect(parsedBody[1].operation).toBe(OperationEnum.WITHDRAW);
    });
  });
});
