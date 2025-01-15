const express = require('express');
const router = express.Router();
const folderController = require('../controllers/folderController');

// 建立資料夾
router.post('/', folderController.createFolder);

// 取得所有資料夾
router.get('/', folderController.getAllFolders);

module.exports = router;
