const Folder = require('../models/Folder');

// 建立資料夾
exports.createFolder = async (req, res) => {
  try {
    console.log('收到請求:', req.body); // 確認收到的資料
    const { folderName } = req.body;
    if (!folderName) {
      return res.status(400).json({ error: '資料夾名稱不能為空' });
    }
    const newFolder = await Folder.create({ folderName });
    console.log('新建資料夾:', newFolder); // 確認資料夾已正確建立
    res.status(201).json(newFolder);
  } catch (error) {
    console.error('建立資料夾時出錯:', error);
    res.status(500).json({ error: 'Error creating folder' });
  }
};

// 取得所有資料夾
exports.getAllFolders = async (req, res) => {
  try {
    const folders = await Folder.find().sort({ createdAt: -1 });
    res.json(folders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching folders' });
  }
};
