# Hahow Interview 專案

## 如何跑起這個 server
### Method 1: 使用 docker compose
```sh
docker compose up --build
```

### Method 2: 使用 Node.js
Node.js 版本：v16.20.2
```
npm ci
npm start
```

成功執行指令後可以在瀏覽器打開 http://localhost:8000/api/health 確認是否有成功把 server 起起來

## 專案的架構
本專案使用 MVC 的架構撰寫，不過由於並沒有實際連結資料庫，是以打 API 的方式模擬從資料庫拿資料，所以使用 utils 取代原本的 model。
另外使用 middleware 來處理權限驗證的部分。
```
.
├── index.js
├── app.js
├── controllers
│   └── heroController.js
├── utils
│   └── heroUtils.js
├── routes
│   └── heroRoute.js
└── middlewares
    └── auth.js
```

## 使用到的第三方 library
- express: 一個流行且成熟的 Node.js Web 應用程式框架，用於建構 API
- axios: 一個用於發送 HTTP 請求的 JavaScript 庫
- dotenv: 將環境變數從 .env 檔載入的程式庫
- jest: 一個常見的 JavaScript 單元測試框架
- supertest: 一個用於測試 Node.js HTTP server 的測試用程式庫

## 撰寫註解的原則
我寫註解的原則為以下兩點：
1. 程式碼背後的邏輯較為複雜，只讀程式碼可能沒辦法直接理解時，加入註解可以幫助理解
2. 程式碼牽涉重要的業務邏輯或可能存在風險時，可以加上註解提供額外說明

## 在這份專案中遇到的困難、問題，以及解決的方法
這份專案本身並不算困難，過程中沒遇到什麼問題。