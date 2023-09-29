export type Expense = {
  _id?: string;
  userId?: string;
  description: string;
  amount: number;
  dueDate: number;
};

export type Income = {
  _id?: string;
  userId?: string;
  description: string;
  amount: number;
  incomeFrequency: IncomeFrequencyEnum;
};

export type CreditCard = {
  _id?: string;
  userId?: string;
  name: string;
  totalDebt: number;
  minimumPayment: number;
  paymentDay: number;
};

export interface FinancialSituation {
  expenses: Expense[];
  incomes: Income[];
  creditCards: CreditCard[];
}
