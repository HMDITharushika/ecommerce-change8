const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Setting = sequelize.define("Setting", {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  value: {
    type: DataTypes.JSON, // flexible & professional
    allowNull: false,
  },

  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  group: {
    type: DataTypes.ENUM("general", "business", "security", "ui"),
    defaultValue: "general",
  },
});

module.exports = Setting;