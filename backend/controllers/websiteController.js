// controllers/websiteController.js
const Website = require('../models/Website');
const Folder = require('../models/Folder');

exports.createWebsite = async (req, res) => {
  try {
    const { folderId, title, url } = req.body;
    // 可選擇先由後端抓取 title，也可前端傳
    // 這裡直接使用傳入的 title

    // 確認 folder 存在
    const folder = await Folder.findById(folderId);
    if (!folder) {
      return res.status(404).json({ error: 'Folder not found' });
    }

    const newWebsite = await Website.create({ folderId, title, url });
    res.status(201).json(newWebsite);
  } catch (error) {
    res.status(500).json({ error: 'Error creating website' });
  }
};

// 根據資料夾 ID 取得所有網站
exports.getWebsitesByFolder = async (req, res) => {
  try {
    const { folderId } = req.query; // 從查詢參數獲取資料夾 ID
    if (!folderId) {
      return res.status(400).json({ error: '資料夾 ID 不能為空' });
    }

    const websites = await Website.find({ folderId }); // 查詢該資料夾的所有網站
    res.json(websites);
  } catch (error) {
    console.error('獲取網站時出錯:', error);
    res.status(500).json({ error: 'Error fetching websites' });
  }
};
