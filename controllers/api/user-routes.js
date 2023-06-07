const router = require('express').Router();
const { User } = require('../../models');

// Get all users
router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'content', 'created_at'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title'],
                    },
                },
            ],
        });
  
        const users = userData.map((user) => user.get({ plain: true }));
  
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Post,
                    attributes: ['id', 'title', 'content', 'created_at'],
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title'],
                    },
                },
            ],
        });
  
        if (!userData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
  
        const user = userData.get({ plain: true });
  
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create a new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = newUser.id;
            req.session.username = newUser.username;
            req.session.logged_in = true;
            res.status(200).json(newUser);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Log in an existing user
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
            email: req.body.email,
            },
        });

        if (!user) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

        const validPassword = await user.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = user.id;
            req.session.username = user.username;
            req.session.logged_in = true;
            res.status(200).json({ user, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Log out the current user
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
  }
});

module.exports = router;
