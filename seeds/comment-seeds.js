const { Comment } = require("../models");

const commentData = [
  {
    user_id: 1,
    post_id: 5,
    content: "I am about to cry while doign this!",
  },
  {
    user_id: 4,
    post_id: 4,
    content: "Wow, you're killing it buddy!",
  },
  {
    user_id: 2,
    post_id: 6,
    content: "your mom 101",
  },
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
