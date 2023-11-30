const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData.json");
const commentData = require("./commentData.json");

const seedDB = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const post = await Post.findAll();

  for (const comment of commentData) {
    const user = users[Math.floor(Math.random() * users.length)];
    const post = post[Math.floor(Math.random() * post.length)];
    await Comment.create({
      ...comment,
      user_id: user.id,
      post_id: post.id,
    });
  }
  process.exit(0);
};

seedDB();
