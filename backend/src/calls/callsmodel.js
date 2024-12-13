import mongoose from "mongoose";

const callSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },

  callId: {
    type: String,
    unique: true,
  },

  caller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Call = mongoose.model("Call", callSchema);

export default Call;
