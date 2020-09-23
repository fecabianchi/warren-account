export interface IPayment {
  description: string;
  sourceAccount: string;
  destinationAccount: string;
  value: number;
  status?: string;
}
