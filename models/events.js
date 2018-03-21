//model/events.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  title: String,
  description: String,
  eventDate: Date,
  deleted: { type: Boolean, default: false }
});

//export to use in server.js
module.exports = mongoose.model("Event", EventSchema);
