import { APIGatewayProxyEvent } from 'aws-lambda';
import { OperationEnum } from '../enums/OperationEnum';
import AccountRepository from '../repositories/AccountRepository';
import HistoryRepository from '../repositories/HistoryRepository';
import AccountService from '../services/AccountService';
import HistoryTransform from '../transforms/HistoryTransform';
import { validator } from '../validators';
import AccountValidator from '../validators/AccountValidator';

export default class AccountController {
  private accountService: AccountService;
  private accountRepository: AccountRepository;
  private historyRepository: HistoryRepository;

  constructor() {
    this.accountService = new AccountService();
    this.accountRepository = new AccountRepository();
    this.historyRepository = new HistoryRepository();
  }

  public async list(event: APIGatewayProxyEvent) {
    const { principalId } = event.requestContext.authorizer;

    const accounts = await this.accountRepository.findAll(principalId);

    return {
      statusCode: 200,
      body: JSON.stringify(accounts)
    }
  }

  public async show(event: APIGatewayProxyEvent) {
    const { principalId } = event.requestContext.authorizer;

    const account = await this.accountRepository.findOneByUserId(principalId);

    return {
      statusCode: 200,
      body: JSON.stringify(account)
    }
  }

  public async withdraw(event: APIGatewayProxyEvent) {
    const { body } = validator(event, AccountValidator.withdraw());
    const { principalId } = event.requestContext.authorizer;

    const account = await this.accountRepository.findOneByUserId(principalId);
    const result = await this.accountService.withdraw(account, body.value);

    await this.historyRepository.create(HistoryTransform.input(account, result, body.value, OperationEnum.WITHDRAW));

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    }
  }

  public async deposit(event: APIGatewayProxyEvent) {
    const { body } = validator(event, AccountValidator.deposit());
    const { principalId } = event.requestContext.authorizer;

    const account = await this.accountRepository.findOneByUserId(principalId);
    const result = await this.accountService.deposit(account, body.value);

    await this.historyRepository.create(HistoryTransform.input(account, result, body.value, OperationEnum.DEPOSIT));

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    }
  }
}
