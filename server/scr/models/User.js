const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  email: String,
  password: String,
});

module.exports = model('Users', UserSchema)

