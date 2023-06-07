const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

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
