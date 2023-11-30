const { User } = require("../models");

const userData = [
  {
    username: "eltitanpalermo26",
    email: "martin_palermo@boca.com",
    password: "bocayoteamo7",
  },
  {
    username: "florezf90",
    email: "yourmom101@yopmail.com",
    password: "yourmom1011",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
