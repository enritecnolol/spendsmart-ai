import { Schema, model, models } from "mongoose";

const messageSchema = new Schema({
  userId: String,
  content: String,
  role: {
    type: String,
    enum: ["system", "user", "assistant", "function"],
  },
});

export default models.Message || model("Message", messageSchema);
