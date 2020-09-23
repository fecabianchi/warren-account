import './config/env';
import * as middy from 'middy';
import { cors } from 'middy/middlewares';
import AccountController from './controllers/AccountController';
import HistoryController from './controllers/HistoryController';
import PaymentController from './controllers/PaymentController';
import UserController from './controllers/UserController';
import { jwtHandler } from './handlers/jwtAuthorizer';
import callbackContext from './middlewares/callbackContext';
import httpErrorHandlerMiddleware from './middlewares/httpErrorHandlerMiddleware';

const accountController = new AccountController();
const historyController = new HistoryController();
const paymentController = new PaymentController();
const userController = new UserController();

/* Endpoints */
export const login = middy(userController.login.bind(userController))
  .use(cors())
  .use(callbackContext())
  .use(httpErrorHandlerMiddleware())

export const withdraw = middy(accountController.withdraw.bind(accountController))
  .use(cors())
  .use(callbackContext())
  .use(httpErrorHandlerMiddleware())

export const deposit = middy(accountController.deposit.bind(accountController))
  .use(cors())
  .use(callbackContext())
  .use(httpErrorHandlerMiddleware())

export const listAccount = middy(accountController.list.bind(accountController))
  .use(cors())
  .use(callbackContext())
  .use(httpErrorHandlerMiddleware())

export const getAccountInfo = middy(accountController.show.bind(accountController))
  .use(cors())
  .use(callbackContext())
  .use(httpErrorHandlerMiddleware())

export const listHistory = middy(historyController.list.bind(historyController))
  .use(cors())
  .use(callbackContext())
  .use(httpErrorHandlerMiddleware())

export const processPayment = middy(paymentController.processPayment.bind(paymentController))
  .use(cors())
  .use(callbackContext())
  .use(httpErrorHandlerMiddleware())

export const jwtAuthorizer = middy(jwtHandler)
  .use(callbackContext())
