import {Schema, model, models} from "mongoose"

const expenseSchema = new Schema({
  description: String,
  amount: Number,
  dueDate: Number,
});

export default models.Expense || model("Expense", expenseSchema);