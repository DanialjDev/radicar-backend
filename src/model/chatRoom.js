const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // هر کاربر فقط یک روم دارد
  },
  title: {
    type: String,
    default: 'چت با دستیار هوشمند'
  },
  carId :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'car',
    required: true
  }
}, { timestamps: true });

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
module.exports = ChatRoom;
