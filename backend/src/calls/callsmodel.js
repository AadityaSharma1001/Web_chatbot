const callSchema = new mongoose.Schema({
    id: { 
        type: String, 
        required: true, 
        unique: true },

    callId: { 
        type: String, 
        unique: true },

    caller: {
         type: mongoose.Schema.Types.ObjectId, 
         ref: "User" },

    receiver: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User" },

    timestamp: { 
        type: Date,
         required: true, 
         default: Date.now },
  })
  
  module.exports = mongoose.model("Call", callSchema);
  