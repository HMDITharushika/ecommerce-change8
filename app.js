const express = require("express");
require("dotenv").config();
const app = express();
const sequelize = require("./config/db");
const authRoutes = require("./routes/auth");
const adminRouter = require("./admin");

app.use(express.json());
app.use("/api", authRoutes);
app.use("/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("API is running")
});

sequelize.sync().then(() => {
  console.log("Database synced");
});

app.listen(3000, () => {
  console.log("Server is running fine on 3000");
});

const bcrypt = require("bcrypt");
const { User } = require("./models");

(async () => {
  const existing = await User.findOne({ where: { email: "admin@gmail.com" } });

  if (!existing) {
    const hashed = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashed,
      role: "admin",
    });

    console.log("✅ Admin user created");
  }
})();

