const chatSchema = new mongoose.Schema({
    id: { 
        type: String, 
        required: true, 
        unique: true },

    chatId: {
         type: String, 
         unique: true },

    participants: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    messages: [
        { type: String }],
  });
  
  module.exports = mongoose.model("Chat", chatSchema);
  