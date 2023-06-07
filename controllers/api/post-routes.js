const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{
                model: User,
                attributes: ['username'],
            },
            {
                model: Comment,
                include: {
                    model: User,
                    attributes: ['username'],
                },
            },
            ],
        });
  
        const posts = postData.map((post) => post.get({ plain: true }));
  
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new post
router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a post by ID
router.put('/:id', withAuth, async (req, res) => {
    try {
        const post = await Post.update({
            title: req.body.title,
            content: req.body.content,
        },
        {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!post[0]) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json({ message: 'Post updated successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a post by ID
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const post = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!post) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json({ message: 'Post deleted successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
