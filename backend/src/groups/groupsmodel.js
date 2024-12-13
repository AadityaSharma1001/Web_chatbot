const groupSchema = new mongoose.Schema({
    id: { type: String,
         required: true, unique: true },

    groupId: { 
        type: String, 
        unique: true },

    name: { 
        type: String, 
        required: true },

    members: [
        { type: mongoose.Schema.Types.ObjectId, 
        ref: "User" }],
  });
  
  module.exports = mongoose.model("Group", groupSchema);
  