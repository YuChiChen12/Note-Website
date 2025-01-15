// controllers/gptController.js
const Conversation = require('../models/Conversation');
const Folder = require('../models/Folder');

// 從 openai 4.x 引入 default 匿名匯出
const { default: OpenAI } = require('openai');

// 如果有用到環境變數，也可再次 require('dotenv').config()
// 不過大多數情況在 server.js 讀取即可
require('dotenv').config();

// 初始化 OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 確保你的 API Key 在 .env 裡面已正確設定
});

// ChatGPT 互動
async function chat(req, res) {
  try {
    const { prompt } = req.body;

    // 呼叫 OpenAI Chat Completions (4.x 寫法)
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', 
      // 或 'gpt-4' (前提是你的帳號已開通 gpt-4 權限)
      messages: [{ role: 'user', content: prompt }],
    });

    // 取得回應內容
    const answer = response.choices[0].message.content;
    res.json({ answer });
  } catch (error) {
    console.error('GPT Chat Error:', error.message);
    res.status(500).json({ error: 'GPT API Error' });
  }
}

// 儲存對話
async function saveConversation(req, res) {
  try {
    const { folderId, content } = req.body;

    // 確認資料夾是否存在
    const folder = await Folder.findById(folderId);
    if (!folder) {
      return res.status(404).json({ error: 'Folder not found' });
    }

    // 建立新對話紀錄
    const newConv = await Conversation.create({ folderId, content });
    res.status(201).json(newConv);
  } catch (error) {
    console.error('Save Conversation Error:', error.message);
    res.status(500).json({ error: 'Error saving conversation' });
  }
}

// 取得指定資料夾的所有對話
async function getConversationsByFolder(req, res) {
  try {
    const { folderId } = req.query;

    const conversations = await Conversation.find({ folderId }).sort({ createdAt: -1 });
    res.json(conversations);
  } catch (error) {
    console.error('Fetch Conversations Error:', error.message);
    res.status(500).json({ error: 'Error fetching conversations' });
  }
}

// 將這三個函式匯出 (CommonJS)
module.exports = {
  chat,
  saveConversation,
  getConversationsByFolder,
};
