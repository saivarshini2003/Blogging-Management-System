const express = require('express');
const { getAllPosts, getPostById, createPost, deletePost } = require('../controllers/blogController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', authMiddleware, createPost);
router.delete('/:id', authMiddleware, deletePost);

module.exports = router;
