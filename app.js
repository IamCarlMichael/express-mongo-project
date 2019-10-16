const express = require("express");
const app = express();

if (app.get("env") !== "test") {
  console.log(app.get("env"));
  require("./db");
}

app.use(express.json());

const user = require("./routes/users");
app.use("/users", user);

const event = require("./routes/events");
app.use("/events", event);

module.exports = app;
