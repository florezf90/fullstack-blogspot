const { Post } = require("../models");

const postData = [
  {
    title: "testing101",
    content:
      "I am just writing this to make sure that the application is working properly.",
    user_id: 3,
  },
  {
    title: "how to not quit 101",
    content:
      "still in the trenches, testing every corner of this website to make sure that is working properly",
    user_id: 1,
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
