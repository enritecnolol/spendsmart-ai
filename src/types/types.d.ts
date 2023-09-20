export type Expense = {
  description: string;
  amount: number;
  dueDate: number;
};

export type Income = {
  description: string;
  amount: number;
  incomeFrequency: IncomeFrequencyEnum;
};

export type CreditCard = {
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
