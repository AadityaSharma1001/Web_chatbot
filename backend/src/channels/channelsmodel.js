const channelSchema = new mongoose.Schema({
    id: { 
        type: String, 
        required: true, unique: true },

    channelId: { 
        type: String, 
        unique: true },

    name: { 
        type: String,
         required: true },

    admins: [
        { type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  });
  
  module.exports = mongoose.model("Channel", channelSchema);
  