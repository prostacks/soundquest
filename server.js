const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

const port = process.env.PORT || 8080;

app.get("/getkeys", (req, res) => {
  const keys = [
    {
      audd: "0251e1d511f58db75fa4b8642a65b65a",
      lastfm: "0410f71d8ac85faf3bbd6d1a58970aaa",
    },
  ];
  res.json(keys);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!!`);
});
