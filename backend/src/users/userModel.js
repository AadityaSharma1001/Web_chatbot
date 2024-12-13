const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { 
    type: String, 
    unique: true },

  email: { 
    type: String,
    unique: true },

  displayName: { 
    type: String },

  profilePicture: { 
    type: String },

  status: { 
    type: String },

  lastSeen: {
     type: Date },

  notifications: [{
     type: String }],

  createdAt: {
     type: Date, 
     default: Date.now },

  updatedAt: { 
    type: Date,
     default: Date.now },

  id: { 
    type: String, required: true, 
    unique: true },
});

module.exports = mongoose.model("User", userSchema);
