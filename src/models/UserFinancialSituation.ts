import { Schema, model, models } from "mongoose";

import expenseSchema from "./Expense"
import incomeSchema from "./Income"
import creditCardSchema from "./CreditCard"

const financialSituationSchema = new Schema({
  expenses: [expenseSchema],
  incomes: [incomeSchema],
  creditCards: [creditCardSchema],
});


export default models.FinancialSituation || model("FinancialSituation", financialSituationSchema);
