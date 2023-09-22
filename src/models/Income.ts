import { Schema, model, models } from "mongoose";

const incomeSchema = new Schema({
  userId: String,
  description: String,
  amount: Number,
  incomeFrequency: {
    type: String,
    enum: ["monthly", "weekly", "biweekly", "occasional"],
  },
});

export default models.Income || model("Income", incomeSchema);
