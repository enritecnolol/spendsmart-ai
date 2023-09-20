import { FinancialSituation } from "../types/types";

export const convertToContextPrompt = (situation: FinancialSituation): string => {
  let prompt = "Given the following financial situation of a user:\n\nIncome:\n";
  
  for (const income of situation.incomes) {
    prompt += `- ${income.description}: $${income.amount}\n`;
  }

  prompt += "\nExpenses:\n";
  
  for (const expense of situation.expenses) {
    prompt += `- ${expense.description}: $${expense.amount}\n`;
  }

  for (const card of situation.creditCards) {
    prompt += `- ${card.name} credit card debt: $${card.totalDebt} (Minimum payment: $${card.minimumPayment})\n`;
  }

  prompt += "\nHow should they allocate their income to cover all their bills? How much money would they have left after all expenses, and how much could they save? If they cannot cover their expenses, what financial advice can you offer them?";

  return prompt;
};