// models/Conversation.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
  folderId: {
    type: Schema.Types.ObjectId,
    ref: 'Folder',
    required: true,
  },
  content: {
    type: String,
    required: true, // 存所有對話或整理後的文本
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Conversation', conversationSchema);
