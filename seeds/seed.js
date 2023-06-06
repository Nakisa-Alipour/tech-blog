const userData = require('./userData');
const postData = require('./postData');
const commentData = require('./commentData');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('Database synced. Seeding data...');

    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    const posts = await Post.bulkCreate(postData, {
        individualHooks: true,
        returning: true,
    });

    const comments = await Comment.bulkCreate(commentData, {
        individualHooks: true,
        returning: true,
    });


    console.log('Data seeding complete!');
    process.exit(0);
};

seedAll();
