const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  passwordConf: String,
});
const AdminModel = mongoose.model("admin", adminSchema);

module.exports = AdminModel;
