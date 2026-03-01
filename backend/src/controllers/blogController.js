const prisma = require('../lib/prisma');

const getAllPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            where: { published: true }, // List only published posts for users
            include: {
                author: {
                    select: { name: true, email: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(posts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching posts' });
    }
};

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) },
            include: {
                author: { select: { name: true, email: true } }
            }
        });

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching post' });
    }
};

const createPost = async (req, res) => {
    try {
        const { title, content, published } = req.body;
        const authorId = req.user.userId;

        const post = await prisma.post.create({
            data: {
                title,
                content,
                published: published || false,
                authorId
            }
        });

        res.status(201).json(post);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating post' });
    }
};

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const authorId = req.user.userId;
        const role = req.user.role;

        // Check if post belongs to user or if user is admin
        const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });
        if (!post) return res.status(404).json({ error: 'Post not found' });

        if (post.authorId !== authorId && role !== 'ADMIN') {
            return res.status(403).json({ error: 'You are not authorized to delete this post.' });
        }

        await prisma.post.delete({ where: { id: parseInt(id) } });

        res.json({ message: 'Post deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting post' });
    }
};

module.exports = { getAllPosts, getPostById, createPost, deletePost };
