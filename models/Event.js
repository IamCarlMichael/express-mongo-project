const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    minlength: 3
  },
  dates: [
    {
      date: String,
      names: [String]
    }
  ],
  dateCreated: String,
  dateExpires: String,
  organiserName: {
    type: String,
    required: true
  }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
