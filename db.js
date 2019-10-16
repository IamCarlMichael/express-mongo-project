const mongoose = require("mongoose");

const dbName = "eventAppDb";

let dbUrl;

if (process.env.NODE_ENV === "development") {
  dbUrl = `mongodb://localhost/${dbName}`;
}

if (process.env.NODE_ENV === "production") {
  dbUrl = process.env.MONGO_URI;
}

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;
mongoose.set("debug", true);
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("we're connected!");
});
