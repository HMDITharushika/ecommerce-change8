const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Setting = sequelize.define("Setting", {
  key: DataTypes.STRING,
  value: DataTypes.STRING,
});

module.exports = Setting;