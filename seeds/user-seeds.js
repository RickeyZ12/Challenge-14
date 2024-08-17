const { User } = require('../models');

const userData = [
  {
    username: 'testuser1',
    password: 'password123',
  },
  {
    username: 'testuser2',
    password: 'password456',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
