const express = require("express");
const router = express.Router();
const Event = require("../models/Event");

router.post("/new", async (req, res, next) => {
  const eventAdd = req.body;
  const event = new Event(eventAdd);
  console.log(eventAdd);
  console.log(event);
  try {
    await Event.init();
    let newEvent = await event.save();
    res.send(newEvent);
  } catch (err) {
    err.status = 400;
    console.log(err);
    res.status(400).send(err.message);
  }
});

router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const event = await Event.find({ uid: userId });
    res.send(event);
  } catch (err) {
    err => console.log("Caught:", err.message);
  }
});

router.get("/:id", async (req, res, next) => {
  const eventId = req.params.id;
  try {
    const event = await Event.find({ _id: eventId });
    res.send(event);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const eventId = req.params.id;
  try {
    const event = await Event.deleteOne({ _id: eventId });
    res.send(event);
  } catch (err) {
    error.status = 404;
    next(error);
  }
});

router.delete("/:id/dates/:date", async (req, res, next) => {
  const eventId = req.params.id;
  const dateToDel = req.params.date;
  try {
    const event = await Event.findOneAndUpdate(
      { _id: eventId },
      { $pull: { dates: { date: dateToDel } } },
      { safe: true, multi: true, new: true }
    );
    res.send(event);
  } catch (error) {
    error.status = 404;
    next(error);
  }
});

router.delete("/:id/dates/:date/users/:name", async (req, res, next) => {
  const eventId = req.params.id;
  const eventDate = req.params.date;
  const nameToDel = req.params.name;
  console.log(nameToDel);
  try {
    const event = await Event.update(
      { _id: eventId, "dates.date": eventDate },
      { $pull: { "dates.$.names": nameToDel } },
      { safe: true, multi: true, new: true }
    );
    res.send(event);
  } catch (error) {
    error.status = 404;
    next(error);
  }
});

router.patch("/:id/dates/:date/users/:name", async (req, res, next) => {
  const eventId = req.params.id;
  const eventDate = req.params.date;
  const nameToAdd = req.params.name;
  console.log(nameToAdd);
  try {
    const event = await Event.update(
      { _id: eventId, "dates.date": eventDate },
      { $push: { "dates.$.names": nameToAdd } },
      { safe: true, multi: true, new: true }
    );
    res.send(event);
  } catch (error) {
    error.status = 404;
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const eventId = req.params.id;
  const newEventName = req.body.newEvent;
  const newExpiry = req.body.dateExpires;
  try {
    const event = await Event.update(
      { _id: eventId },
      { eventName: newEventName, dateExpires: newExpiry },
      { safe: true, multi: true, new: true }
    );
    res.send(event);
  } catch (error) {
    error.status = 404;
    next(error);
  }
});

router.post("/new", async (req, res, next) => {
  const eventAdd = req.body;
  const event = new Event(eventAdd);
  console.log(eventAdd);
  console.log(event);
  try {
    await Event.init();
    let newEvent = await event.save();
    res.send(newEvent);
  } catch (err) {
    err.status = 400;
    console.log(err);
    res.status(400).send(err.message);
  }
});

router.post("/:id", async (req, res) => {
  const eventId = req.params.id;
  const suggestedNewDates = req.body.dates;
  try {
    const addedDates = await Event.update(
      { _id: eventId },
      { $push: { dates: suggestedNewDates } },
      { safe: true, multi: true, new: true }
    );
    res.send(addedDates);
  } catch (err) {
    err.status = 400;
    console.log(err);
    res.status(400).send(err.message);
  }
});

module.exports = router;
