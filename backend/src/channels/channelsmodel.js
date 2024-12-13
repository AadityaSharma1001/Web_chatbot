import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },

  channelId: {
    type: String,
    unique: true,
  },

  name: {
    type: String,
    required: true,
  },

  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Channel = mongoose.model("Channel", channelSchema);

export default Channel;
