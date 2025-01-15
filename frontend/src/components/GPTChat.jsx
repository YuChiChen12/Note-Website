import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function GPTChat({ selectedFolder, apiBase }) {
  const [prompt, setPrompt] = useState('');
  const [answer, setAnswer] = useState('');
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (selectedFolder) {
      fetchConversations(selectedFolder._id);
    }
  }, [selectedFolder]);

  const fetchConversations = async (folderId) => {
    try {
      const res = await axios.get(`${apiBase}/gpt/conversations?folderId=${folderId}`);
      setConversations(res.data);
    } catch (err) {
      console.error('Fetch conversation error:', err);
    }
  };

  const handleChat = async () => {
    if (!prompt.trim()) return;

    try {
      const res = await axios.post(`${apiBase}/gpt/chat`, { prompt });
      setAnswer(res.data.answer);
    } catch (err) {
      console.error('GPT chat error:', err);
    }
  };

  const handleSaveConversation = async () => {
    if (!selectedFolder) return alert('請先選擇資料夾');
    if (!answer.trim()) return;

    try {
      const body = {
        folderId: selectedFolder._id,
        content: `User: ${prompt}\nGPT: ${answer}`,
      };
      const res = await axios.post(`${apiBase}/gpt/saveConversation`, body);
      // 更新 conversation 列表
      setConversations([res.data, ...conversations]);
    } catch (err) {
      console.error('Save conversation error:', err);
    }
  };

  return (
    <div>
      <h3>GPT Chat</h3>
      <textarea
        rows={3}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="輸入你的 prompt..."
      />
      <br />
      <button onClick={handleChat}>Send to GPT</button>
      <div>
        <h4>GPT 回覆：</h4>
        <div style={{ whiteSpace: 'pre-wrap', background: '#f0f0f0', padding: '10px' }}>
          {answer}
        </div>
        <button onClick={handleSaveConversation} disabled={!answer}>
          儲存這段對話
        </button>
      </div>

      <hr />
      <h4>已儲存對話列表 (在目前資料夾)：</h4>
      <ul>
        {conversations.map(conv => (
          <li key={conv._id}>
            <div style={{ whiteSpace: 'pre-wrap' }}>{conv.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
