const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
  longURL: {
    type: String,
    required: true
  },
  shortURL: {
    type: String,
    required: true,
  },
  shortUrlId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: false,
    default: ''
  },
  visits: {
    type: Number,
    required: false,
    default: 0
  }
})

module.exports = mongoose.model('URL', UserSchema)
