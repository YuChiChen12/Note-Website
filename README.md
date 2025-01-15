# Project Name: Note-Website

## Overview

Note-Website 是一個全棧應用程式，提供便捷的筆記管理功能，並整合 OpenAI 的 GPT 服務。

---

## Prerequisites

1. [Node.js](https://nodejs.org/) (建議使用 LTS 版本)
2. [Conda](https://docs.conda.io/en/latest/) (用於管理 Python 環境)

---

## Installation and Setup

以下是安裝和啟動專案的完整步驟：

### **1. 建立 Conda 環境**

如果尚未安裝 Conda，請先到 [Conda 官網](https://docs.conda.io/en/latest/miniconda.html) 安裝 Miniconda 或 Anaconda。

#### 使用 `env.yml` 建立環境

```bash
conda env create -f env.yml
```

#### 啟用環境

```bash
conda activate testing
```

### **2. 安裝後端依賴並啟動**

1. 切換到後端目錄：

   ```bash
   cd backend
   ```

2. 安裝依賴：

   ```bash
   npm install
   ```

3. 啟動後端伺服器：
   ```bash
   npm run dev
   ```

### **3. 安裝前端依賴並啟動**

1. 切換到前端目錄：

   ```bash
   cd ../frontend
   ```

2. 安裝依賴：

   ```bash
   npm install
   ```

3. 啟動前端伺服器：
   ```bash
   npm run dev
   ```

### **4. 開啟應用程式**

在瀏覽器中打開以下網址以使用應用程式：

```
http://localhost:5173/
```

---

## Project Structure

```
.
├── backend
│   ├── config
│   │   └── db.js
│   ├── controllers
│   │   ├── folderController.js
│   │   ├── gptController.js
│   │   └── websiteController.js
│   ├── models
│   │   ├── Conversation.js
│   │   ├── Folder.js
│   │   └── Website.js
│   ├── routes
│   │   ├── folderRoutes.js
│   │   ├── gptRoutes.js
│   │   └── websiteRoutes.js
│   ├── server.js
│   └── package.json
├── frontend
│   ├── public
│   │   └── vite.svg
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   │   ├── FolderSidebar.jsx
│   │   │   ├── GPTChat.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── WebsiteManager.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── index.html
│   └── vite.config.js
├── env.yml
├── .gitignore
└── README.md
```

---

## Troubleshooting

- 如果出現依賴相關的問題，請確保 Node.js 和 Conda 已正確安裝。
- 如果環境無法啟動，檢查 `env.yml` 和 `package.json` 是否正確。

---

## License

此專案採用 [MIT License](LICENSE) 授權。

---

## Contributors

感謝所有參與此專案的開發者！
