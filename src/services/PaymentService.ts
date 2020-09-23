import { connection } from '../config/db';
import { IPayment } from '../interfaces/IPayment';
import AccountRepository from '../repositories/AccountRepository';
import PaymentRepository from '../repositories/PaymentRepository';
import AccountService from '../services/AccountService';
import PaymentTransform from '../transforms/PaymentTransform';

export default class PaymentService {
  private accountService: AccountService;
  private accountRepository: AccountRepository;
  private paymentRepository: PaymentRepository;

  constructor() {
    this.accountService = new AccountService();
    this.accountRepository = new AccountRepository();
    this.paymentRepository = new PaymentRepository();
  }

  public async process(userId: string, data: IPayment) {
    const session = await connection.startSession();
    session.startTransaction();
    try {
      const sourceAccount = await this.accountRepository.findOneByUserId(userId);
      const destinationAccount = await this.accountRepository.findById(data.destinationAccount);
      const payment = await this.paymentRepository.create(PaymentTransform.input(String(sourceAccount._id), data));      

      await this.accountService.withdraw(sourceAccount, payment.value);
      await this.accountService.deposit(destinationAccount, payment.value);

      payment.status = 'complete'
      const result = await payment.save();

      await session.commitTransaction();
      session.endSession()
      return result;
    } catch (err) {
      await session.abortTransaction();
      session.endSession()
    }
  }
}
