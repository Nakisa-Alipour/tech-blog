const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Dashboard route
router.get('/', withAuth, async (req, res) => {
    try {
        // Get all posts created by the logged-in user with their associated comments
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id },
            include: [
                {
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

    // Serialize the data
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the dashboard template with the posts data and username
    res.render('dashboard', { posts, loggedIn: true, username: req.session.username });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Create new post route
router.get('/new', withAuth, (req, res) => {
    // Render the new-post template, allowing the user to create a new post
    res.render('create-post', { loggedIn: true, username: req.session.username });
});

// Edit post route
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        // Find the post to be edited
        const postData = await Post.findByPk(req.params.id, {
        include: [
            {
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

        if (!postData) {
            // If no post is found with the provided ID, return a 404 error
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        // Serialize the data
        const post = postData.get({ plain: true });

        // Render the edit-post template with the post data and username
        res.render('edit-post', { post, loggedIn: true, username: req.session.username });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;

