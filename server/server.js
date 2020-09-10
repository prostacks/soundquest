const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const port = 8080;

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

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!!`);
});
