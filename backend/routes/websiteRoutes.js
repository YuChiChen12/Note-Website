// routes/websiteRoutes.js
const express = require('express');
const router = express.Router();
const websiteController = require('../controllers/websiteController');

// 新增網站
router.post('/', websiteController.createWebsite);
// 取得同資料夾內所有網站
router.get('/', websiteController.getWebsitesByFolder);

module.exports = router;
