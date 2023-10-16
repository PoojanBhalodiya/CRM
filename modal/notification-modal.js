const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  notifications: [
    {
      title: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        required: true,
      },
      image: {
        type: String, // Assuming it's a URL to an image
      },
      datetime: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Notification", notificationSchema);
