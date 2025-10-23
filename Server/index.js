const express = require("express");
const fs = require("fs");
const os = require("os");

const { appendFile } = fs;
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(`<h1>Welcome back!</h1>`);
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
