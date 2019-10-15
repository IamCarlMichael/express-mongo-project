const express = require("express");
const app = express();

if (app.get("env") !== "test") {
  console.log(app.get("env"));
  require("./db");
}

module.exports = app;
