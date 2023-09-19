export type Expense = {
  description: string
  amount: number
  dueDate: number
}

export type Income = {
  description: string
  amount: number
  incomeFrequency: IncomeFrequencyEnum
}