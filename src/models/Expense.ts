import {Schema, model, models} from "mongoose"

const expenseSchema = new Schema({
  userId: String,
  description: String,
  amount: Number,
  dueDate: Number,
});

export default models.Expense || model("Expense", expenseSchema);