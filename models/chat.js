const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
  to: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  msg: {
    type: String,
    maxlength: 50,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

const Chat = mongoose.model("Chat",chatSchema);
module.exports = Chat;