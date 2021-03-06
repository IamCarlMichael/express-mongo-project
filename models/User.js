const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    index: true
  },
  telNumber: Number,
  uid: String
});

const User = mongoose.model("User", userSchema);

module.exports = User;
