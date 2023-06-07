const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all comments
router.get('/', async (req, res) => {
    try {
        const commentsData = await Comment.findAll({
            include: [{ model: User, attributes: ['username'] }],
        });
  
        const comments = commentsData.map((comment) => comment.get({ plain: true }));
  
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a comment by ID
router.get('/:id', async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['username'] }],
        });
  
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }
  
        const comment = commentData.get({ plain: true });
  
        res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
});
  
  

// Create a new comment
router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newComment);

    } catch (err) {
    res.status(500).json(err);
  }
});

// Update a comment by ID
router.put('/:id', withAuth, async (req, res) => {
    try {
        const comment = await Comment.update(
            {comment_text: req.body.comment_text,},
            {where: 
                {id: req.params.id, 
                user_id: req.session.user_id,},
            }
        );

        if (!comment[0]) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json({ message: 'Comment updated successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a comment by ID
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const comment = await Comment.destroy({
        where: {
            id: req.params.id,
            user_id: req.session.user_id,
        },
        });

        if (!comment) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json({ message: 'Comment deleted successfully!' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
