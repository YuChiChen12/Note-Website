// models/Folder.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const folderSchema = new Schema({
  folderName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Folder', folderSchema);
