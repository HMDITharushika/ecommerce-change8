const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running")
});

app.listen(3000, () => {
  console.log("Server is running fine on 3000");
});

