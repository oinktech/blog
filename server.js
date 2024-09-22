require('dotenv').config();
const express = require('express');
const path = require('path');
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');
const app = express();
const articlesRouter = require('./routes/articles');
const PORT = process.env.PORT || 3000;

// 設定靜態文件夾
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Clerk 身份驗證
app.use(ClerkExpressWithAuth({
  secretKey: process.env.CLERK_SECRET_KEY,
  frontendApi: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
}));

// 文章路由
app.use('/api/articles', articlesRouter);

// 前端頁面
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/create', (req, res) => res.sendFile(path.join(__dirname, 'views', 'create.html')));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
