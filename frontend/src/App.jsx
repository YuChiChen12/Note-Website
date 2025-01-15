import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import Navbar from './components/Navbar';
import FolderSidebar from './components/FolderSidebar';
import WebsiteManager from './components/WebsiteManager';
import GPTChat from './components/GPTChat';

// 你後端預設埠：4000
const API_BASE = 'http://localhost:4000/api';

export default function App() {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(null);

  // 取得資料夾列表
  const fetchFolders = async () => {
    try {
      const res = await axios.get(`${API_BASE}/folders`);
      setFolders(res.data);
    } catch (err) {
      console.error('Fetch folders error:', err);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  // 建立新資料夾
  const createFolder = async (folderName) => {
    try {
      const res = await axios.post(`${API_BASE}/folders`, { folderName });
      // 新增資料夾後重新抓取資料（以確保一致性）
      fetchFolders();
    } catch (err) {
      console.error('Create folder error:', err);
    }
  };  

  return (
    <>
      <Navbar />
      <div className="main">
        <div className="sidebar">
          <FolderSidebar
            folders={folders}
            onSelectFolder={setSelectedFolder}
            onCreateFolder={createFolder}
          />
        </div>
        <div className="content">
          {/* 根據需要顯示不同區塊(此處簡化呈現) */}
          <WebsiteManager
            selectedFolder={selectedFolder}
            apiBase={API_BASE}
          />
          <hr />
          <GPTChat
            selectedFolder={selectedFolder}
            apiBase={API_BASE}
          />
        </div>
      </div>
    </>
  );
}
