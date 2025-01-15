// models/Website.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WebsiteSchema = new mongoose.Schema({
  folderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Website', WebsiteSchema);
