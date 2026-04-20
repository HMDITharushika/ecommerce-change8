const express = require("express");
require("dotenv").config();
const app = express();
const sequelize = require("./config/db");
const authRoutes = require("./routes/auth");
const adminRouter = require("./admin");
const { User } = require("./models");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use("/api", authRoutes);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("API is running")
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");

    await sequelize.sync({ alter: true });
    console.log("Database synced");

    app.listen(3000, () => {
      console.log("Server running on 3000 fine");
    });

  } catch (error) {
    console.error("Startup error", error);
    process.exit(1);
  }
};

startServer();