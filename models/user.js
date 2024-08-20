const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String },

  fullName: { type: String },
  email: { type: String },
  address: { type: String },
  state: { type: String },
  district: { type: String },
  zip: { type: String },
  ccname: { type: String },
  cccvv: { type: String },
  ccexpiration: { type: String },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
