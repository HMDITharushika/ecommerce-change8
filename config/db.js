const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

sequelize.authenticate()
  .then(() => console.log("DB connected"))
  .catch(err => console.log("Error:", err));

module.exports = sequelize;