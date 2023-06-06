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

module.exports = router;
