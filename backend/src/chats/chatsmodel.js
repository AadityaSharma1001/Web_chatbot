import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },

  chatId: {
    type: String,
    unique: true,
  },

  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  messages: [{ type: String }],
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
