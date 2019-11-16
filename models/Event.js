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
  voteExpires: String,
  organiserName: {
    type: String
  },
  uid: String
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
