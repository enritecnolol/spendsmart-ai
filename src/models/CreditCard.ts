import { Schema, model, models } from "mongoose";

const creditCardSchema = new Schema({
  name: String,
  totalDebt: Number,
  minimumPayment: Number,
  paymentDay: Number,
});


export default models.CreditCard || model("CreditCard", creditCardSchema);