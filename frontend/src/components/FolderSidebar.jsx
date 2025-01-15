import React, { useState } from 'react';

export default function FolderSidebar({ folders, onSelectFolder, onCreateFolder }) {
  const [newFolderName, setNewFolderName] = useState('');

  const handleAddFolder = () => {
    if (newFolderName.trim() === '') {
      alert('資料夾名稱不能為空！');
      return;
    }
    console.log('新增資料夾名稱:', newFolderName); // 調試用
    onCreateFolder(newFolderName); // 呼叫父層的 `createFolder`
    setNewFolderName(''); // 清空輸入框
  };  

  return (
    <div>
      <h3>Folders</h3>
      <ul>
        {folders.map((folder) => (
          <li key={folder._id} onClick={() => onSelectFolder(folder)}>
            {folder.folderName}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newFolderName}
        onChange={(e) => setNewFolderName(e.target.value)}
        placeholder="新增資料夾"
      />
      <button onClick={handleAddFolder}>Add</button>
    </div>
  );
}
