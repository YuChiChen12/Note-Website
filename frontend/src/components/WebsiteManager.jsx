import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function WebsiteManager({ selectedFolder, apiBase }) {
  const [urlInput, setUrlInput] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    if (selectedFolder) {
      fetchWebsites(selectedFolder._id);
    }
  }, [selectedFolder]);

  const fetchWebsites = async () => {
    try {
      if (!selectedFolder) return; // 如果未選擇資料夾則直接返回
      const res = await axios.get(`${apiBase}/websites`, {
        params: { folderId: selectedFolder._id },
      });
      setWebsites(res.data); // 更新網站列表
    } catch (err) {
      console.error('Fetch websites error:', err);
    }
  };
  

  const handleAddWebsite = async () => {
    if (!selectedFolder) return alert('請先選擇資料夾');
    if (!urlInput.trim()) return;

    try {
      const body = {
        folderId: selectedFolder._id,
        title: titleInput || 'No Title',
        url: urlInput,
      };
      const res = await axios.post(`${apiBase}/websites`, body);
      setWebsites([res.data, ...websites]);
      setUrlInput('');
      setTitleInput('');
    } catch (err) {
      console.error('Create website error:', err);
    }
  };

  return (
    <div>
      <h3>Website Manager</h3>
      {selectedFolder ? (
        <>
          <p>Current Folder: {selectedFolder.folderName}</p>
          <input
            type="text"
            placeholder="Website Title"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            style={{ marginRight: '8px' }}
          />
          <input
            type="text"
            placeholder="Website URL"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            style={{ marginRight: '8px' }}
          />
          <button onClick={handleAddWebsite}>Add Website</button>
          <ul>
            {websites.map(site => (
              <li key={site._id}>
                <a href={site.url} target="_blank" rel="noopener noreferrer">
                  {site.title}
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>請先選擇資料夾</p>
      )}
    </div>
  );
}
