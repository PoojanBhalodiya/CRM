const mongoose = require("mongoose");

const notifySchema = new mongoose.Schema({
  title: {
    type: String,
  },
  desc: {
    type: String,
  },
  image: {
    type: Number,
  },
  datetime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Notify", notifySchema);
