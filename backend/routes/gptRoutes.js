// routes/gptRoutes.js
const express = require('express');
const router = express.Router();

// 這裡從 gptController 拿到三個方法
const {
  chat,
  saveConversation,
  getConversationsByFolder
} = require('../controllers/gptController');

// 註冊路由
router.post('/chat', chat);
router.post('/saveConversation', saveConversation);
router.get('/conversations', getConversationsByFolder);

// 匯出路由 (CommonJS)
module.exports = router;
