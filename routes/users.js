const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/new", async (req, res, next) => {
  const usernameAdd = req.body;
  const user = new User(usernameAdd);
  console.log(usernameAdd);
  console.log(user);
  try {
    await User.init();
    let newUser = await user.save();
    res.send(newUser);
  } catch (err) {
    err.status = 400;
    console.log(err);
    res.status(400).send(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (err) {
    err => console.log("Caught:", err.message);
  }
});

router.get("/:name", async (req, res, next) => {
  const username = req.params.name;
  const re = new RegExp(username, "gi");

  try {
    const username = await User.find({ username: re });
    res.send(username);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete("/:name", async (req, res, next) => {
  const name = req.params.name;
  try {
    const user = await User.deleteOne({ username: name });
    res.send(user);
  } catch (error) {
    error.status = 404;
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const userId = req.params.id;
  const newName = req.body.newUsername;
  const newContact = req.body.newTelNumber;
  try {
    const userUpdates = await User.update(
      { _id: userId },
      { username: newName, telNumber: newContact },
      { safe: true, multi: true, new: true }
    );
    res.send(userUpdates);
  } catch (error) {
    error.status = 404;
    next(error);
  }
});

module.exports = router;
