const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("chatdb", "root", "Sanjay@123", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
