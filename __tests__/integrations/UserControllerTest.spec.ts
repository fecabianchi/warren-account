import createEvent from '@serverless/event-mocks';
import { connection } from '../../src/config/db';
import UserController from '../../src/controllers/UserController';
import { User } from '../../src/models';

describe('UserControllerTest', () => {
  
  const userController = new UserController();

  beforeAll(async () => {
    await User.create({
      email: 'test@teste.com',
      password: '123456'
    })
  });

  afterAll(async () => {
    await User.deleteMany({});
    await connection.close();
  });

  describe('Login', () => {
    it('should get a token', async () => {
      const event = createEvent('aws:apiGateway', {
        httpMethod: 'POST',
        body: {
          email: 'test@teste.com',
          password: '123456'
        }
      } as any);

      process.env.JWT_SECRET = 'super_secret'
      const result = await userController.login(event);
      const parsedBody = JSON.parse(result.body);

      expect(result.statusCode).toBe(200);
      expect(parsedBody.token).toBeDefined();
    });
  });
});
