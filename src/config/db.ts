import './env';
import { createConnection } from 'mongoose';

const isTest = process.env.JEST_WORKER_ID;
const url = (isTest ? process.env.MONGO_URL : process.env.DB_HOST)

export const connection = createConnection(url || '', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
