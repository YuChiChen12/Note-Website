require('dotenv').config(); // 讀取 .env 內容
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 載入路由 (CommonJS)
const gptRoutes = require('./routes/gptRoutes');
const websiteRoutes = require('./routes/websiteRoutes'); // 載入網站路由
const folderRoutes = require('./routes/folderRoutes'); // 載入 folderRoutes

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 連接資料庫 (mongodb://localhost:27017/20250116 之類)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 路由
app.use('/api/gpt', gptRoutes);
app.use('/api/folders', folderRoutes); // 掛載 `/api/folders` 路徑
app.use('/api/websites', websiteRoutes); // 掛載網站路由

// 啟動伺服器
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
