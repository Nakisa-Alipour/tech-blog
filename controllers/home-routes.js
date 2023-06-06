const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Home route
router.get('/', async (req, res) => {
    try {
        // Get all posts with their associated user and comments
        const postData = await Post.findAll({
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

        // Render the homepage template with the posts data
        res.render('homepage', { posts });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
  }
});


// Login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    // Render the login template
    res.render('login');
});
  
// Sign up route
router.get('/signup', (req, res) => {
    // Render the signup template
    res.render('signup');
});

// Get single post route
router.get('/post/:id', async (req, res) => {
    try {
        // Find the post with the provided ID, including its associated user and comments
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
  
        // Render the single post template with the post data
        res.render('single-post', { post });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});
  
  
module.exports = router;


