const express = require("express");
require("dotenv").config();
const app = express();
const sequelize = require("./config/db");
const authRoutes = require("./routes/auth");
const adminRouter = require("./admin");
const { User } = require("./models");
const bcrypt = require("bcrypt");
const seedSettings = require("./seeders/seedSettings");

app.use(express.json());
app.use("/api", authRoutes);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.redirect('/admin')
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");

    await sequelize.sync({ alter: true });
    console.log("Database synced");
    await seedSettings();

    const PORT = process.env.PORT;

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });

  } catch (error) {
    console.error("Startup error", error);
    process.exit(1);
  }
};

startServer();