const express = require("express");
const app = express();
const cors = require("cors");

if (app.get("env") !== "test") {
  console.log(app.get("env"));
  require("./db");
}

const corsOptions = {
  credentials: true,
  allowedHeaders: "content-type",
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(express.json());

const user = require("./routes/users");
app.use("/users", user);

const event = require("./routes/events");
app.use("/events", event);

module.exports = app;
