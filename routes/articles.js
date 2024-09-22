const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

let articles = [];

// 创建文章
router.post('/', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: true, message: '標題和內容均為必填項' });
    }

    const id = uuidv4(); // 使用 UUID 生成唯一的文章 ID
    const newArticle = { id, title, content, createdAt: new Date() };
    articles.push(newArticle);
    res.json(newArticle);
});

// 获取所有文章
router.get('/', (req, res) => {
    res.json(articles);
});

// 根据 ID 获取文章
router.get('/:id', (req, res) => {
    const article = articles.find(a => a.id === req.params.id);
    if (!article) {
        return res.status(404).json({ message: '文章未找到' });
    }
    res.json(article);
});

module.exports = router;
