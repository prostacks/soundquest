const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const port = process.env.PORT || 8080;

app.use(cors());

app.get("/getkeys", (req, res) => {
  const keys = [
    {
      audd: process.env.API_KEY1,
      lastfm: process.env.API_KEY2,
    },
  ];
  res.json(keys);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!!`);
});
