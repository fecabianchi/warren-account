import { APIGatewayProxyEvent } from 'aws-lambda';
import HistoryRepository from '../repositories/HistoryRepository';

export default class HistoryController {
  private historyRepository: HistoryRepository;

  constructor() {
    this.historyRepository = new HistoryRepository();
  }

  public async list(event: APIGatewayProxyEvent) {
    const { principalId } = event.requestContext.authorizer;

    const histories = await this.historyRepository.findAllByUserId(principalId);

    return {
      statusCode: 200,
      body: JSON.stringify(histories)
    }
  }
}
