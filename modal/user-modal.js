const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    //default: mongoose.Types.ObjectId, // This sets it to a new ObjectId by default
  },

  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  mobileNo: {
    type: Number,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
