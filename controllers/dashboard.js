const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Dashboard route
router.get('/', withAuth, async (req, res) => {
  try {
    // Get all posts created by the logged-in user
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize the data
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the dashboard template with the posts data
    res.render('dashboard', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
