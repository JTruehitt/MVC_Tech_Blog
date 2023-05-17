const sequelize = require('../config/connection')
const { User, Post, Comment } = require("../models");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Create users
  const users = await User.bulkCreate([
    {
      first_name: "John",
      last_name: "Doe",
      user_name: "johndoe",
      password: "password123",
    },
    {
      first_name: "Jane",
      last_name: "Smith",
      user_name: "janesmith",
      password: "password456",
    },
    {
      first_name: "Michael",
      last_name: "Johnson",
      user_name: "mjohnson",
      password: "password789",
    },
    {
      first_name: "Emily",
      last_name: "Davis",
      user_name: "edavis",
      password: "passwordabc",
    },
    {
      first_name: "David",
      last_name: "Wilson",
      user_name: "dwilson",
      password: "passworddef",
    },
  ]);

  // Create posts
  const posts = await Post.bulkCreate([
    {
      title: "First Post",
      description: "This is the first post",
      user_id: 1,
    },
    {
      title: "Second Post",
      description: "This is the second post",
      user_id: 2,
    },
    {
      title: "Third Post",
      description: "This is the third post",
      user_id: 3,
    },
    {
      title: "Fourth Post",
      description: "This is the fourth post",
      user_id: 4,
    },
    {
      title: "Fifth Post",
      description: "This is the fifth post",
      user_id: 5,
    },
  ]);

  // Create comments
  await Comment.bulkCreate([
    {
      message: "Great post!",
      user_id: 1,
      post_id: 1,
    },
    {
      message: "Nice job!",
      user_id: 1,
      post_id: 2
    },
    {
      message: "Awesome!",
      user_id: 2,
      post_id: 3,
    },
    {
      message: "Well done!",
      user_id: 2,
      post_id: 4,
    },
    {
      message: "Keep it up!",
      user_id: 3,
      post_id: 5,
    },
    {
      message: "Cool post!",
      user_id: 3,
      post_id: 1,
    },
    {
      message: "Nice work!",
      user_id: 4,
      post_id: 2,
    },
    {
      message: "Wowie!",
      user_id: 4,
      post_id: 3,
    },
    {
      message: "Daaaaang!",
      user_id: 5,
      post_id: 4,
    },
    {
      message: "Very nice!",
      user_id: 5,
      post_id: 5,
    },
  ]);

  console.log("Seed data created successfully!");
};

seedDatabase();
