import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },

  displayName: {
    type: String,
    required: true,
  },

  profilePicture: {
    type: String,
  },

  status: {
    type: String,
  },

  lastSeen: {
    type: Date,
  },

  notifications: [
    {
      type: String,
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },

});

const User = mongoose.model("User", userSchema);

export default User;
